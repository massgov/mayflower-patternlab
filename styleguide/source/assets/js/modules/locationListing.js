import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";
import getSvgFromPath from "../helpers/getSvgFromPath.js"

export default function (window,document,$,undefined) {

  // Only run this code if we have a js object from location-listing.twig with location listing data.
  if (typeof locationListing === "undefined") {
    return;
  }

  let masterData = []; // to preserve state

  $('.js-location-listing').each(function(){
    let $el = $(this),
      $mapCol = $el.find('.js-location-listing-map'),
      $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    $map.on('ma:GoogleMap:MapInitialized', function(e, markers) {
      let masterListing = locationListing.imagePromos.items,
        masterListingMarkup = transformLocationListingPromos(masterListing);

      // Populate master data structure
      masterData.maxItems = locationListing.maxItems ? locationListing.maxItems : locationListing.imagePromos.items.length;
      masterData.resultsHeading = locationListing.resultsHeading;
      masterData.items = getMasterListingWithMarkupAndMarkers(masterListing, masterListingMarkup, markers);
      masterData.pagination = locationListing.pagination;
      masterData.totalPages = Math.ceil(markers.length / masterData.maxItems);
    });


    $(document).on('ma:LibrariesLoaded:GoogleMaps', function(){
      // Set up click, hover handlers for location listing rows.
      $el.on('click', '.js-location-listing-link', function (e) {
        let index = $(e.currentTarget).index();
        // trigger map to recenter on this item based on it's index.
        $map.trigger('recenter', index);
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
        $map.trigger('bounce', index);
      });

      // Handle location listings form interaction (triggered by locationFilters.js).
      $el.on('ma:LocationListing:FormInteraction', function (e, args) {
        transformData(args);
      });
      // Handle active filter/tag button interactions (triggered by resultsHeading.js).
      $el.on('ma:LocationListing:ActiveTagInteraction', function (e, args) {
        transformData(args);
      });
      // Handle map update, marker sort event (triggered by googleMap.js).
      $el.on('ma:LocationListing:MarkersSorted', function (e, sortedData) {
        // Render page 1 of our new sorted location listing.
        renderListingPage({data: sortedData, page: 1});
      });
      // Handle pagination event, render targetPage
      $el.on('ma:LocationListing:Pagination', function (e, target) {
        masterData.pagination = transformPaginationData({data: masterData, targetPage: target});
        renderListingPage({data: masterData, page: target});
        console.log('on ma:locationListing:UpdateMarkers pagination', masterData);
        $el.trigger('ma:LocationListing:UpdateMarkers', [{data: masterData, page: target}]);
      });

      // Trigger location listing initialization event.
      $el.trigger('ma:LocationListing:ListingInitialized', [masterData]);
    });
  });

  // Create a master data source with listing information and markup.
  function getMasterListingWithMarkupAndMarkers(listing, markup, markers) {
    let items = [];
    markers.forEach(function (item, index) {
      items[index] = {
        isActive: true,
        page: Math.ceil((index+1) / masterData.maxItems),
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
    promos.map(function (data, index) {
      let promoData = promoTransform(data);
      listingMarkup[index] = compiledTemplate(promoData);
    });
    return listingMarkup;
  }

  function transformData(args) {
    let filters = getFilters(args);
    masterData.resultsHeading.tags = filters;
    masterData.pagination = transformPaginationData({data: masterData, targetPage: 1});

    if (!filters.length) {
      // No filters, sort masterData alphabetically, make all active (i.e. no filter applied).
      let sortedData = sortDataAlphabetically(makeAllActive(masterData));
      renderListingPage({data: sortedData, page: 1});
      console.log('ma:LocationListing:UpdateMarkers reset', masterData);
      $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [{data: masterData, page: 1}]);
    }
    else {
      // Determine which filter / sort values are present.
      let hasPlace = hasFilter(filters, 'location'),
        hasTags = hasFilter(filters, 'tag'),
        filteredData = [];

      // If tag filter is present, filter the master list based on current tag values.
      if (hasTags) {
        // Get just the tag values from the filters array.
        let tags = getFilterValues(filters, 'tag');
        filteredData = filterDataByTags(tags, masterData);
      }

      // If place (zip/city/address field) value is present, sort (filtered) master list based on the value.
      if (hasPlace) {
        // Get just the place value from the filters array.
        let place = getFilterValues(filters, 'location'),
          placeData = hasTags ? filteredData : makeAllActive(masterData);
        console.log('ma:LocationListing:UpdateMarkers hasPlace', placeData);
        $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [{data: placeData, place: place}]);
      }
      else {
        let sortedData = sortDataAlphabetically(filteredData);
        renderListingPage({data: sortedData, page: 1});
        console.log('ma:LocationListing:UpdateMarkers noPlace', masterData);
        $('.js-location-listing').trigger('ma:LocationListing:UpdateMarkers', [{data: masterData}]);
      }
    }
  }

  function transformPaginationData(args) {
    let transformedData = args.data;

    // Make new page active
    transformedData.pagination.pages = switchActivePage(transformedData.pagination.pages, getCurrentPage(transformedData.pagination.pages), args.targetPage);
    return transformedData.pagination;
  }

  function transformResultsHeading(data) {
    let firstItem = (Number(data.maxItems) * Number(data.currentPage)) - (Number(data.maxItems) - 1),
      lastItem = firstItem + (Number(data.pageTotal) - 1);

    data.resultsHeading.totalResults = data.totalActive;
    data.resultsHeading.numResults = firstItem + " - " + lastItem;
    return data.resultsHeading;
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

  function getFilters(args) {
    if (args.hasOwnProperty('clearedFilter')) {
      // Single filter button clicked, so remove that filter from the list.
      if (args.clearedFilter !== "all") {
        let filters = masterData.resultsHeading.tags;
        // Remove the clicked tag from the tags array.
        return filters.filter(function (tag) {
          return tag.value !== args.clearedFilter.value;
        });
      }
      else {
        // Clear all button was clicked so remove all filters.
        return [];
      }
    }
    // This was a form submission so return the applied filters.
    return args.filters;
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

    data.items = updatePageNumbers(items);
    return data;
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

  function updatePageNumbers(items) {
    let page = 1,
      pageTotal = 0;
    return items.map(function(item){
      if (item.isActive) {
        if (pageTotal < masterData.maxItems){
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
      pageTotal = 0,
      totalActive = 0,
      data = args.data,
      page = args.page;

    data.items.map(function(item){
      if (item.isActive) {
        totalActive += 1;
        if (item.page === page) {
          $el.append(item.markup);
          pageTotal += 1;
        }
      }
    });
    sticky.init($('.js-location-listing-map'));

    data.currentPage = page;
    data.totalActive = totalActive;
    data.pageTotal = pageTotal;

    data.resultsHeading = transformResultsHeading(data);

    masterData = data; // preserve state
    $('.js-location-listing').trigger('ma:LocationListing:ListingsUpdated', [data]);
  }

}(window,document,jQuery);
