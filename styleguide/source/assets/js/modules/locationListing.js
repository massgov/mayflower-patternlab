import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  $('.js-location-listing').each(function(i){
    let $el = $(this),
      $mapCol = $el.find('.js-location-listing-map'),
      $map = $el.find('.js-google-map'),
      $resultsHeading = $el.find('.js-results-heading'),
      $pagination = $el.find('.js-pagination'),
      $locationFilter = $el.find('.js-location-filters');

    sticky.init($mapCol);

    // Get the location listing component data (this could be replaced with an api)
    const rawData = ma.locationListing[i]; // Data object created in @organisms/by-author/location-listing.twig

    let masterData = []; // master data structure to preserve state
    // Listen for map initialization, populate master data structure using locationListing, map markers.
    $map.on('ma:GoogleMap:MapInitialized', function(e, markers) {
      masterData = populateMasterDataSource(rawData, markers); // to preserve state
    });

    // Listen for Google Map api library load completion, with geocode, geometry, and places libraries
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
      $locationFilter.on('ma:LocationFilter:FormSubmitted', function (e, formValues) {
        let transformation = transformData(masterData, formValues);
        masterData = transformation.data; // preserve state
        // Trigger child components render with updated data
        updateChildComponents(transformation);
      });

      // Handle active filter/tag button interactions (triggered by resultsHeading.js).
      $resultsHeading.on('ma:ResultsHeading:ActiveTagClicked', function (e, clearedFilter) {
        let transformation = transformData(masterData, clearedFilter);
        masterData = transformation.data; // preserve state
        transformation.clearedFilter = clearedFilter;

        // Trigger child components render with updated data
        updateChildComponents(transformation);
      });

      // Handle pagination event (triggered by pagination.js), render targetPage
      $pagination.on('ma:Pagination:Pagination', function (e, target) {
        masterData.pagination = transformPaginationData({data: masterData, targetPage: target});
        masterData.resultsHeading = transformResultsHeading({data: masterData, page: target});
        renderListingPage({data: masterData, page: target});

        let markers = getActiveMarkers({data: masterData, page: target});
        // Trigger child components render with updated data
        updateChildComponents({data: masterData, markers: markers});
      });
    });

    // Trigger events to update child components with new data.
    function updateChildComponents(args) {
      $resultsHeading.trigger('ma:ResultsHeading:DataUpdated', [args.data.resultsHeading]);
      $map.trigger('ma:GoogleMap:MarkersUpdated', [{markers: args.markers, place: args.place}]);
      $pagination.trigger('ma:Pagination:DataUpdated', [args.data.pagination]);
      if (args.clearedFilter) {
        $locationFilter.trigger('ma:FormFilter:DataUpdated', [args.clearedFilter]);
      }
    }
  });

  /**
   * Data initialization.
   */

  /**
   * Returns a master data structure with page level / listing item level data and markup, to reflect component state.
   *
   * @param listing
   *   The locationListing data structure to use as a source
   * @param markers
   *   The array of map markers created by component google map (googleMaps.js module)
   * @returns {Array}
   *   An array with the following structure:
   *    [
   *      maxItems: the max number of items to show per listing "page" if provided, defaults to all
   *      totalPages: the number of pages of items that should render, given the current filters
   *      resultsHeading: the data structure necessary to render a resultsHeading component
   *      items: an array of listing items [
   *        isActive: whether or not the listing should be shown, given current filters state
   *        page: the page that the listing, if active, will appear on, given the current sort order
   *        promo: the data structure for the imagePromo component
   *        markup: the compiled imagePromo markup
   *        marker: the related map marker data structure for the listing item
   *      ]
   *      pagination: the data structure necessary to render a pagination component
   *    ]
   */
  function populateMasterDataSource(listing, markers) {
    // Populate master data structure
    let masterData = [];

    // Ensure locationListing.imagePromos.items is an array (the twig template json_encode()'s a php array)
    let promosArray = [];
    $.map(listing.imagePromos.items, function(val, index) { promosArray[index] = val; });
    listing.imagePromos.items = promosArray;

    // Ensure locationListing.pagination.pages is an array (the twig template json_encode()'s a php array)
    let pages = [];
    $.map(listing.pagination.pages, function(val, index) { pages[index] = val; });
    listing.pagination.pages = pages;

    // Get the listing imagePromos, generate markup for each
    let masterListing = listing.imagePromos.items,
      masterListingMarkup = transformLocationListingPromos(masterListing);

    // The max number of items per page, if designated in locationListing data structure, else all
    masterData.maxItems = listing.maxItems ? listing.maxItems : listing.imagePromos.items.length;
    // The initial results heading data structure
    masterData.resultsHeading = listing.resultsHeading;
    // The array of items and their respective page, in/active status, marker data, imagePromo data, and markup
    masterData.items = getMasterListingWithMarkupAndMarkers(masterListing, masterListingMarkup, markers, masterData.maxItems);
    // The initial pagination data structure
    masterData.pagination = listing.pagination;
    // The total number of pages, given the number of items and the maxItems variable
    masterData.totalPages = Math.ceil(masterData.items.length / masterData.maxItems);

    return masterData;
  }

  /**
   * Creates the master data structure items array
   *
   * @param listing
   *   The locationListing data structure
   * @param markup
   *   The generated array of item markup
   * @param markers
   *   The associated map markers for each item
   * @param max
   *   The maximum number of items per page
   * @returns {Array}
   *  An array of listing items with the following structure:
   *  [
   *      isActive: whether or not the listing should be shown, given current filters state
   *      page: the page that the listing, if active, will appear on, given the current sort order
   *      promo: the data structure for the imagePromo component
   *      markup: the compiled imagePromo markup
   *      marker: the related map marker data structure for the listing item
   *   ]
   */
  function getMasterListingWithMarkupAndMarkers(listing, markup, markers, max) {
    let items = [];
    markers.forEach(function (item, index) {
      items[index] = {
        isActive: true, // @todo consider checking for this in case of server side preprocessing of state
        page: Math.ceil((index+1) / max),
        marker: item,
        markup: markup[index],
        promo: listing[index]
      };
    });
    return items;
  }

  /**
   * Creates an array with generated markup for location listing items, preserving original index.
   *
   * @param promos
   *  The locationListing.imagePromos array of items
   *
   * @returns {Array}
   *  An array of compiled markup
   */
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
   * Data transformation.
   */

  /**
   * The main data transformation wrapper, returns an instance of masterData which reflects the component state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param transformation
   *  An object representing the change in state (locationFilter form data, resultsHeading tag interaction, etc.)
   *
   * @returns {{data: *, markers: *}}
   *  An object with the current state masterData instance and an array of their related sorted markers to send to map.
   */
  function transformData(data, transformation) {
    // First filter the data based on component state, then sort alphabetically by default.
    let filteredData = filterListingData(data, transformation),
      sortedData = sortDataAlphabetically(filteredData),
      place = '';

    // Sort data by location, if that filter is present.
    if (hasFilter(filteredData.resultsHeading.tags, 'location')) {
      place = getFilterValues(filteredData.resultsHeading.tags, 'location')[0]; // returns array
      // If place argument was selected from the locationFilter autocomplete (initiated on the zipcode text input).
      if (ma.autocomplete.getPlace()) {
        place = ma.autocomplete.getPlace();
        // Sort the markers and instance of locationListing masterData.
        sortedData = sortDataAroundPlace(place, filteredData);
      }
      // If place argument was populated from locationFilter (zipcode text input) but not from Place autocomplete.
      else {
        // Geocode the address, then sort the markers and instance of locationListing masterData.
        ma.geocoder = ma.geocoder ? ma.geocoder : new google.maps.Geocoder();
        // @todo limit geocode results to MA?
        sortedData = geocodeAddressString(place, sortDataAroundPlace, filteredData);
      }
    }

    // Update the results heading based on the current items state.
    sortedData.resultsHeading = transformResultsHeading({data: sortedData});
    // Render the listing page.
    renderListingPage({data: sortedData});

    // Get the associated markers based on the listing items.
    let markers = getActiveMarkers({data: sortedData});

    // Preserve state of current data.
    return {
      data: sortedData,
      markers: markers,
      place: place
    };
  }

  /**
   * Filters the listing data based on component filter state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param filterData
   *  Data structure representing either the newly applied or cleared filters.
   * @returns {*}
   */
  function filterListingData(data, filterData) {
    // Get the currently active filters.
    let filters = transformActiveTagsData({data: data, filterData: filterData});
    // Update the results heading tags with the new active filters.
    data.resultsHeading.tags = filters;
    // Update pagination data structure, reset to first page
    data.pagination = transformPaginationData({data: data}); // @todo this should probably go last so we know page #s

    // If tag (checkbox) filter is present, filter based on current tag values.
    if (hasFilter(filters, 'tag')) {
      // Get just the tag values from the filters array.
      let tags = getFilterValues(filters, 'tag');
      // Identify active data based on filter.
      return filterDataByTags(tags, data);
    }

    // Either there are no filters or the only active filter is location, make all items active
    return makeAllActive(data);
  }

  /**
   * Returns the markers which correspond to a given "page" of location listing data.
   *
   * @param args
   *  An object with the following structure:
   *    {
   *      data: instance of filtered, sorted masterData off of which to base markers
   *      page: the target page of items/markers to render
   *    }
   *
   * @returns
   *   An array of corresponding map marker objects which should be rendered
   */
  function getActiveMarkers(args) {
    let data = args.data,
      page = args.page ? args.page : 1; // default to first page if non provided

    // Get just the markers from our active sorted/filtered data listing.
    return data.items.filter(function(item) {
      return item.isActive && item.page === page;
    }).map(function(item) {
      return item.marker;
    });
  }

  /**
   * Creates the active filter object based on either cleared or submitted filter data.
   *
   * @param args
   *   An object with the following structure:
   *   data {
   *    [masterData current instance]
   *   },
   *   filterData: {
   *     clearedFilter: (optional cleared filter data)
   *     {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     }, || 'all' (if clear all button was pressed)
   *     {
   *       formData: (optional submitted form filter data)
   *       [
   *         {
   *           type: '[filter type] location || tag',
   *           text: '[filter label]',
   *           value: '[filter value]'
   *         }, ...
   *       ]
   *     }
   *   }
   *
   * @returns {*}
   */
  function transformActiveTagsData(args) {
    if (args.filterData.hasOwnProperty('clearedFilter')) {
      return getActiveFilters(args.data, args.filterData); // This was an active tag interaction, get remaining filters.
    }
    else {
      return args.filterData.formData; // This was a form submission, so just return the applied form data.
    }
  }

  /**
   * Returns the data structure necessary to render pagination component, reflecting current state.
   *
   * @param args
   *   An object with the following structure:
   *   {
   *     data: [instance of filtered, sorted master data],
   *     targetPage: (optional) the page which should be active
   *   }
   *
   * @returns {*}
   *   Data structure necessary to render pagination component
   */
  function transformPaginationData(args) {
    let data = args.data;
    let targetPage = args.targetPage ? args.targetPage : 1; // default to first page if none passed

    // Make new page active.
    data.pagination.pages = switchActivePage(data.pagination.pages, getCurrentPage(data.pagination.pages), targetPage);
    // @todo determine previous, next button state, as well as the necessary number of pages based on filters.
    return data.pagination;
  }

  /**
   * Updates the resultsHeading data structure to reflect the current component state.
   *
   * @param args
   *    Arguments object with the following structure:
   *    args: {
   *      data: the current instance of master data,
   *      page: (optional) the current page, defaults to 1
   *    }
   *
   * @returns {resultsHeading|{numResults, totalResults}|*}
   */
  function transformResultsHeading(args) {
    let pageTotal = 0,
      totalActive = 0,
      page = args.page ? args.page : 1,
      data = args.data,
      resultsHeading = data.resultsHeading; // preserve active resultsHeading.tags

    // Tally the total active and page length.
    data.items.map(function(item){
      if (item.isActive) {
        totalActive += 1;
        if (item.page === page) {
          pageTotal += 1;
        }
      }
    });

    // Get the index (from 1) of the first and last items on this page.
    let firstItem = (Number(data.maxItems) * Number(page)) - (Number(data.maxItems) - 1),
      lastItem = firstItem + (Number(pageTotal) - 1);

    resultsHeading.totalResults = totalActive;
    resultsHeading.numResults = firstItem + " - " + lastItem; // @todo add accessibility consideration here

    return resultsHeading;
  }

  /**
   * Returns the index of the current page in the pagination.pages array
   *
   * @param pages
   *   An array representing pagination.pages
   *
   * @returns {int}
   *   The index of the current page in the pagination.pages array
   */
  function getCurrentPage(pages) {
    let currentPage = 0;
    pages.forEach(function(page, index) {
      if (page.hasOwnProperty('active') && page.active === true) {
        currentPage = index;
      }
    });
    return currentPage;
  }

  /**
   * Returns the pagination.pages array with updated active page
   *
   * @param pages
   *   The current pagination.pages array
   * @param currentPage
   *   The index of the currently active Page
   * @param targetPage
   *   The page which should be active (identified by its page button text, not index!)
   * @returns array
   *   Updated pagination.pages array
   */
  function switchActivePage(pages, currentPage, targetPage) {
    pages[currentPage].active = false;
    pages.forEach(function(page) {
      if (page.text === targetPage.toString()) {
        page.active = true;
      }
    });
    return pages;
  }

  /**
   * Returns an array of the currently active filters, based on passed filterData.
   *
   * @param data
   *   The current instance of master data structure.
   *
   * @param filterData
   *  An object representing the cleared filter:
   *  {
   *    clearedFilter: {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     } || 'all' (if clear all button was pressed)
   *  }
   *
   * @returns {Array}
   *   An array of the currently active filters:
   *   [  {
   *        type:
   *        text:
   *        value:
   *      }, ... ]
   */
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

  /**
   * Returns true if the passed filters array includes an item with the passed type.
   *
   * @param filters
   *   Array of filters.
   * @param type
   *   The type of filter to search for.
   *
   * @returns {*|boolean}
   */
  function hasFilter(filters, type) {
    return filters.some(function (filter) {
      return filter.hasOwnProperty('type') && filter['type'] === type;
    });
  }

  /**
   * Returns the value(s) of the passed filters of the passed type.
   *
   * @param filters
   *   Array of filters from which to abstract values.
   * @param type
   *   The type of filter to search for.
   *
   * @return array
   *   An array of filter values of type.
   */
  function getFilterValues(filters, type) {
    return filters.filter(function(data) {
      return data.type === type;
    }).map(function(data) {
      return data.value;
    })
  }

  /**
   * Returns transformed imagePromo data object.
   *
   * @param promo
   *   The imagePromo.item[]{} being transformed.
   *
   * @returns {*}
   *   The original imagePromo object with a formatted tag property.
   */
  function promoTransform(promo) {
    // Ensure tags are an array.
    let tags = [];
    $.map(promo.tags, function(val, index) { tags[index] = val; });
    promo.tags = tags;

    let tagsData = {
      tagsFormatted: promo.tags.map(transformTag)
    };
    return Object.assign({},promo,tagsData);
  }

  /**
   * Returns a formatted imagePromo.tag object with a label and svg icon markup.
   *
   * @param tag
   *   The tag being transformed.
   *
   * @returns {{label, svg: boolean}}
   */
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromTag(tag.id)
    };
  }

  /**
   * Returns the svg element markup from the corresponding tag filter checkbox label icon
   *
   * @param tag
   *  The imagePromo tag.id whose icon we need
   *
   * @return string
   *  The svg element for the matching filter form tag input.
   */
  function getSvgFromTag(tag) {
    // Get the existing corresponding icon markup so we don't have to worry about outdated markup.
    return $('.ma__location-filters__tag').find("#" + tag).parent().siblings('svg').prop('outerHTML');
  }

  /**
   * Returns an instance of master data which is sorted alphabetically by imagePromo.title.text
   *
   * @param data
   *    The instance of master data being sorted.
   *
   * @returns {*}
   *    Sorted instance of master data.
   */
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
   * Returns instance of location listing masterData, sorted proximity to place.
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
    if (typeof ma.geocoder === "undefined") {
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

  /**
   * Resets all items in a master data instance to active (i.e. not filtered out).
   *
   * @param data
   *    The instance of master data whose items are being made active.
   *
   * @returns {*}
   *    The master data instance with all active items.
   */
  function makeAllActive(data) {
    data.items = data.items.map(function(item){
      item.isActive = true;
      return item;
    });
    return data;
  }

  /**
   * Returns masterData with necessary filtered items flagged inactive.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @param data
   *   The current instance of master data being filtered.
   *
   * @returns {*}
   *   The 'filtered' (flagged) instance of master data.
   */
  function filterDataByTags(tags, data){
    data.items = data.items.map(function(item) {
      item.isActive = doesPromoContainTags(item.promo.tags, tags);
      return item;
    });

    return data;
  }

  /**
   * Determines if an masterData item contains the necessary tag(s).
   *
   * @param haystack
   *  The imagePromo object in question.
   *
   * @param needle
   *   The tag(s) being searched for.
   *
   * @returns {boolean|*}
   */
  function doesPromoContainTags(haystack, needle) {
    return needle.every(function(v) {
      return Boolean(haystack.filter(function(item){
        return Object.values(item).indexOf(v) !== -1;
      }).length);
    });
  }

  /**
   * Assigns page values to masterData items, based on the provided max number.
   *
   * @param items
   *   The master data items.
   *
   * @param max
   *   The max number of items to show per page.
   *
   * @returns
   *   The updated master data items.
   */
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

  /**
   * Renders the new page of location listing image promos and broadcasts the rendered master data instance.
   *
   * @param args
   *   Arguments object with the following structure:
   *   {
   *      page: (optional) the page to be rendered, defaults to 1
   *      data: the instance of master data to render
   *   }
   */
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
  }

}(window,document,jQuery);
