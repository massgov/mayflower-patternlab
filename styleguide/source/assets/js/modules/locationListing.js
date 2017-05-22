import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";
import getSvgFromPath from "../helpers/getSvgFromPath.js"

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(i){
    let $el = $(this),
      $mapCol = $el.find('.js-location-listing-map'),
      $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // Get the location listing component data (this could be replaced with an api)
    const rawData = locationListing[i]; // Data object created in @organisms/by-author/location-listing.twig

    // Ensure locationListing.imagePromos.items is an array
    let promosArray = [];
    $.map(rawData.imagePromos.items, function(val, index) { promosArray[index] = val; });
    rawData.imagePromos.items = promosArray;

    // Ensure locationListing.pagination.pages is an array
    let pages = [];
    $.map(rawData.pagination.pages, function(val, index) { pages[index] = val; });
    rawData.pagination.pages = pages;

    let masterData = []; // master data structure to preserve state

    // Listen for map initialization, populate master data structure using locationListing, markers.
    $map.on('ma:GoogleMap:MapInitialized', function(e, markers) {
      masterData = populateMasterDataSource(rawData, markers); // to preserve state
    });
    
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function(){
      // Set up click, hover handlers for location listing rows.
      $el.on('click', '.js-location-listing-link', function (e) {
        let index = $(e.currentTarget).index();
        // trigger map to recenter on this item based on it's index.
        $map.trigger('ma:GoogleMap:MapRecenter', index);
        // mark this link as active
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');
        $(e.currentTarget).addClass('is-active'); // in case the event is triggered on a child element.
        // focus on the map - mainly for mobile when it is stacked
        let position = $map.offset().top;
        $("html,body").stop(true, true).animate({scrollTop: position}, '750');
      });
      $el.on('mouseenter', '.js-location-listing-link', function (e) {
        // remove active state from previously selected list item
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');

        let index = $(e.currentTarget).index();
        // trigger map to recenter on this item and make the marker bounce
        $map.trigger('ma:GoogleMap:MarkerBounce', index);
      });

      // Handle location listings form interaction (triggered by locationFilters.js).
      $el.on('ma:LocationListing:FormInteraction', function (e, formValues) {
        let transformation = transformData(masterData, formValues);
        masterData = transformation.data; // preserve state
        $el.trigger('ma:LocationListing:UpdateMarkers', [{markers: transformation.markers}]);
      });

      // Handle active filter/tag button interactions (triggered by resultsHeading.js).
      $el.on('ma:LocationListing:ActiveTagInteraction', function (e, clearedFilter) {
        let transformation = transformData(masterData, clearedFilter);
        masterData = transformation.data; // preserve state
        $el.trigger('ma:LocationListing:UpdateMarkers', [{markers: transformation.markers}]);
      });

      // Handle pagination event, render targetPage
      $el.on('ma:LocationListing:Pagination', function (e, target) {
        masterData.pagination = transformPaginationData({data: masterData, targetPage: target});
        masterData.resultsHeading = transformResultsHeading({data: masterData, page: target});
        renderListingPage({data: masterData, page: target});

        let markers = getActiveMarkers({data: masterData, page: target});
        $el.trigger('ma:LocationListing:UpdateMarkers', [{markers: markers, page: target}]);
      });

      // Trigger location listing initialization event.
      $el.trigger('ma:LocationListing:ListingInitialized', [masterData]);
    });
  });

  /**
   * Master data initialization.
   */

  function populateMasterDataSource(listing, markers) {
    let masterData = [];

    // Get the listing imagePromos, generate markup for each
    let masterListing = listing.imagePromos.items,
      masterListingMarkup = transformLocationListingPromos(masterListing);

    // Populate master data structure
    masterData.maxItems = listing.maxItems ? listing.maxItems : listing.imagePromos.items.length;
    masterData.resultsHeading = listing.resultsHeading;
    masterData.items = getMasterListingWithMarkupAndMarkers(masterListing, masterListingMarkup, markers, masterData.maxItems);
    masterData.pagination = listing.pagination;
    masterData.totalPages = Math.ceil(markers.length / masterData.maxItems);

    return masterData;
  }

  // Create a master data source with listing information and markup.
  function getMasterListingWithMarkupAndMarkers(listing, markup, markers, max) {
    let items = [];
    markers.forEach(function (item, index) {
      items[index] = {
        isActive: true,
        page: Math.ceil((index+1) / max),
        marker: item,
        markup: markup[item._listingKey],
        promo: listing[item._listingKey]
      };
    });
    return items;
  }

  // Create new array with generated markup for location listing items, preserving original index.
  function transformLocationListingPromos(promos) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate('locationListingRow');
    let listingMarkup = [];
    promos.forEach(function (data, index) {
      let promoData = promoTransform(data);
      listingMarkup[index] = compiledTemplate(promoData);
    });
    return listingMarkup;
  }


  /**
   * Master data transformation.
   */

  function transformData(data, transformation) {
    let filteredData = filterListingData(data, transformation),
      sortedData = sortDataAlphabetically(filteredData);

    if (hasFilter(filteredData.resultsHeading.tags, 'location')) {
      let place = getFilterValues(filteredData.resultsHeading.tags, 'location')[0]; // returns array
      // If place argument is was selected from locationFilter autocomplete
      if (autocomplete.getPlace()) {
        place = autocomplete.getPlace();
        // Sort the markers and instance of locationListing masterData.
        sortedData = sortDataAroundPlace(place, filteredData);
      }
      else {
        // If place argument was populated from locationFilter but not selected from Place autocomplete.
        window.geocoder = window.geocoder ? window.geocoder : new google.maps.Geocoder();
        // Geocode the address, then sort the markers and instance of locationListing masterData.
        sortedData = geocodeAddressString(place, sortDataAroundPlace, filteredData);
      }
    }

    sortedData.resultsHeading = transformResultsHeading({data: sortedData});
    renderListingPage({data: sortedData});

    let markers = getActiveMarkers({data: sortedData});

    // Preserve state of current data
    return {
      data: sortedData,
      markers: markers
    };
  }

  function filterListingData(data, filterData) {
    let filters = transformActiveTagsData({data: data, filterData: filterData});
    data.resultsHeading.tags = filters;
    data.pagination = transformPaginationData({data: data});

    // If tag (checkbox) filter is present, filter based on current tag values.
    if (hasFilter(filters, 'tag')) {
      // Get just the tag values from the filters array.
      let tags = getFilterValues(filters, 'tag');
      // Identify active data based on filter
      return filterDataByTags(tags, data);
    }

    // Either there are no filters or the only active filter is location, make all items active
    return makeAllActive(data);
  }

  /**
   * Returns the markers which correspond to a given "page" of location listing data.
   */
  function getActiveMarkers(args) {
    let data = args.data,
      page = args.page ? args.page : 1;

    // Get just the markers from our active sorted/filtered data listing.
    return data.items.filter(function(item) {
      return item.isActive && item.page === page;
    }).map(function(item) {
      return item.marker;
    });
  }

  function transformActiveTagsData(args) {
    if (args.filterData.hasOwnProperty('clearedFilter')) {
      return getActiveFilters(args.data, args.filterData); // This was an active tag interaction
    }
    else {
      return args.filterData.filters; // This was a form submission so return the applied filters.
    }
  }

  function transformPaginationData(args) {
    let data = args.data;
    let targetPage = args.targetPage ? args.targetPage : 1; // default to first page if none passed

    // Make new page active
    data.pagination.pages = switchActivePage(data.pagination.pages, getCurrentPage(data.pagination.pages), targetPage);
    return data.pagination;
  }

  function transformResultsHeading(args) {

    let pageTotal = 0,
      totalActive = 0,
      page = args.page ? args.page : 1,
      data = args.data,
      resultsHeading = data.resultsHeading; // preserve active resultsHeading.tags

    data.items.map(function(item){
      if (item.isActive) {
        totalActive += 1;
        if (item.page === page) {
          pageTotal += 1;
        }
      }
    });

    let firstItem = (Number(data.maxItems) * Number(page)) - (Number(data.maxItems) - 1),
      lastItem = firstItem + (Number(pageTotal) - 1);

    resultsHeading.totalResults = totalActive;
    resultsHeading.numResults = firstItem + " - " + lastItem;
    return resultsHeading;
  }

  function getCurrentPage(pages) {
    let currentPage = '';
    pages.forEach(function(page, index) {
      if (page.hasOwnProperty('active') && page.active === true) {
        currentPage = index;
      }
    });
    return currentPage;
  }

  function switchActivePage(pages, currentPage, targetPage) {
    pages[currentPage].active = false;
    pages.forEach(function(page) {
      if (page.text === targetPage.toString()) {
        page.active = true;
      }
    });
    return pages;
  }

  function getActiveFilters(data, filterData) {
    // Single filter button clicked, so remove that filter from the list.
    if (filterData.clearedFilter !== "all") {
      let filters = data.resultsHeading.tags;
      // Remove the clicked tag from the tags array.
      return filters.filter(function (tag) {
        return tag.value !== filterData.clearedFilter.value;
      });
    }
    else {
      // Clear all button was clicked so remove all filters.
      return [];
    }
  }

  function hasFilter(filters, type) {
    return filters.some(function (filter) {
      return hasValue(filter, 'type', type);
    });
  }

  function hasValue(obj, key, value) {
        return obj.hasOwnProperty(key) && obj[key] === value;
      }

  function getFilterValues(array, filter) {
    return array.filter(function(data) {
      return data.type === filter;
    }).map(function(data) {
      return data.value;
    })
  }

  // Do any necessary data transformation to make imagePromo data fit locationListingRow template.
  function promoTransform(data) {
    // Ensure tags are an array
    let tags = [];
    $.map(data.tags, function(val, index) { tags[index] = val; });
    data.tags = tags;

    let tagsData = {
      tagsFormatted: data.tags.map(transformTag)
    };
    return Object.assign({},data,tagsData);
  }

  // Transform tag template, get svg code from twig template path.
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromPath(tag.icon)
    };
  }

  // Reorder listingMarkup array, based on the order of the map markers.
  function sortDataAlphabetically(data) {
    let items = data.items.sort(function(a, b) {
      let nameA = a.promo.title.text.toUpperCase(),
        nameB = b.promo.title.text.toUpperCase();
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    data.items = paginateItems(items, data.maxItems);
    return data;
  }

  /**
   * Returns instance of location listing masterData, sorted proximity to place on marker._listingKey.
   *
   * @param place
   *   The geocode information by which to sort.
   * @param data
   *   The instance of location listing masterData.
   * @returns {*}
   *   Sorted instance of location listing masterData.
   */
  function sortDataAroundPlace(place, data) {
    // Get all existing marker distance from place, assign as marker property.
    for (let key in data.items) {
      if (data.items.hasOwnProperty(key)) {
        data.items[key].marker.distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, data.items[key].marker.getPosition());
      }
    }

    // Sort existing markers by closest to the place.
    data.items.sort(function (a, b) {
      return a.marker.distance - b.marker.distance;
    });

    // Update each location listing item's page number based on new marker sort order.
    data.items = paginateItems(data.items, data.maxItems);

    // Return the newly sorted instance of location listing masterData.
    return data;
  }

  /**
   * Geocodes an address string arg and executes callback upon successful return.
   *
   * @param address
   *   Address string to be geocoded.
   * @param callback
   *   Callback function to execute (with callbackArg).
   * @param callbackArg
   *   Argument to pass to callback.
   *
   * @returns {*}
   *   Upon success, the return value of the passed callback function.
   */
  function geocodeAddressString(address, callback, callbackArg) {
    // Only attempt to execute if google's geocode library is loaded.
    if (typeof window.geocoder === "undefined") {
      return;
    }
    // Geocode address string, then execute callback with argument upon success.
    return geocoder.geocode({address: address}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        return callback(results[0], callbackArg);
      }
      else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function makeAllActive(data) {
    data.items = data.items.map(function(item){
      item.isActive = true;
      return item;
    });
    return data;
  }

  // Filter listings by tags.
  function filterDataByTags(tags, data){
    data.items = data.items.map(function(item) {
      item.isActive = doesPromoContainTags(item.promo.tags, tags);
      return item;
    });

    return data;
  }

  // @todo abstract this to be useful elsewhere
  function doesPromoContainTags(haystack, needle) {
    return needle.every(function(v) {
      return Boolean(haystack.filter(function(item){
        return Object.values(item).indexOf(v) !== -1;
      }).length);
    });
  }

  function paginateItems(items, max) {
    let page = 1,
      pageTotal = 0;
    return items.map(function(item){
      if (item.isActive) {
        if (pageTotal < max){
          item.page = page;
        }
        else {
          page += 1;
          pageTotal = 0;
          item.page = page;
        }
        pageTotal += 1;
      }
      return item;
    });
  }

  // Remove the imagePromos children content on the current location listing page.
  function clearListingPage() {
    $('.js-location-listing-results').find('.ma__image-promos').html('');
  }

  // Render new imagePromo items.
  function renderListingPage(args) {
    clearListingPage();
    let $el = $('.js-location-listing-results').find('.ma__image-promos'),
      page = args.page ? args.page : 1;

    args.data.items.forEach(function(item){
      if (item.isActive && item.page === page) {
        $el.append(item.markup);
      }
    });

    sticky.init($('.js-location-listing-map'));
    $('.js-location-listing').trigger('ma:LocationListing:ListingsUpdated', [args.data]);

  }

}(window,document,jQuery);
