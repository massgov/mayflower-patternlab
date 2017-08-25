import getTemplate from "../helpers/getHandlebarTemplate.js";
import listing from "../helpers/listing.js";


export default function (window,document,$,undefined) {
  $('.js-event-listing-interactive').each(function(i) {
    let $el = $(this),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
        $events = $el.find('.js-event-listing-items'),
        $eventFilter = $el.find('.js-event-location-filters');

    // Get the location listing component data (this could be replaced with an api)
    const rawData = ma.eventListingInteractive[i]; // Data object created in @organisms/by-author/event-listing-interactive.twig

    let masterData = []; // master data structure to preserve state

    masterData = populateMasterDataSource(rawData); // to preserve state

    // Handle location listings form interaction (triggered by locationFilters.js).
    $eventFilter.on('ma:EventFilter:FormSubmitted', function (e, formValues) {
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

    // Handle pagination click events -- winning!
    $pagination.on('ma:Pagination:Pagination', function (e, target) {
      "use strict";
      let nextPage = target;

      // Get the current page, default to first page if not in global data object.
      let currentPage = masterData.pagination.currentPage ? masterData.pagination.currentPage : 1;
      if (target === "next") {
        nextPage = currentPage + 1;
      }
      if (target === "previous") {
        nextPage = currentPage - 1;
      }

      masterData.pagination = listing.transformPaginationData({data: masterData, targetPage: nextPage});
      masterData.resultsHeading = listing.transformResultsHeading({data: masterData, page: nextPage});
      renderListingPage({data: masterData, page: nextPage});

      // Trigger child components render with updated data
      updateChildComponents({data: masterData});
    });

    // Trigger events to update child components with new data.
    function updateChildComponents(args) {
      $resultsHeading.trigger('ma:ResultsHeading:DataUpdated', [args.data.resultsHeading]);

      $pagination.trigger('ma:Pagination:DataUpdated', [args.data.pagination]);
      if (args.clearedFilter) {
        $eventFilter.trigger('ma:FormFilter:DataUpdated', [args.clearedFilter]);
      }
    }

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
    function populateMasterDataSource(listing) {
      // Populate master data structure
      let masterData = [];

      // Ensure locationListing.imagePromos.items is an array (the twig template json_encode()'s a php array)
      let listArray = [];
      $.map(listing.eventListing.events, function(val, index) { listArray[index] = val; });
      listing.eventListing.events = listArray;

      // Ensure locationListing.pagination.pages is an array (the twig template json_encode()'s a php array)
      let pages = [];
      $.map(listing.pagination.pages, function(val, index) { pages[index] = val; });
      listing.pagination.pages = pages;

      // Get the current page from the initial data structure, default to 1 if none passed.
      let currentPage = 1;
      pages.forEach(function(page) {
        if (page.active) {
          currentPage = Number(page.text);
        }
      });

      // Get the listing imagePromos, generate markup for each
      let masterListing = listing.eventListing.events,

      // Pass in listing and template name.
      masterListingMarkup = transformListing(masterListing, 'eventListingRow');

      // The max number of items per page, if designated in locationListing data structure, else all
      masterData.maxItems = listing.maxItems ? listing.maxItems : masterListing.length;
      // The initial results heading data structure
      masterData.resultsHeading = listing.resultsHeading;
      // The array of items and their respective page, in/active status, marker data, imagePromo data, and markup

      // Create a new function "getMasterListingWithMarkup"
      masterData.items = getMasterListingWithMarkup(masterListing, masterListingMarkup, masterData.maxItems);

      // The initial pagination data structure + currentPage;
      masterData.pagination = listing.pagination;
      masterData.pagination.currentPage = currentPage;

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
    function getMasterListingWithMarkup(listing, markup, max) {
      let items = [];
      listing.forEach(function (item, index) {
        items[index] = {
          isActive: true, // @todo consider checking for this in case of server side preprocessing of state
          page: Math.ceil((index+1) / max),
          markup: markup[index],
          data: listing[index]
        };
      });
      return items;
    }

  });
  /**
   * Creates an array with generated markup for location listing items, preserving original index.
   *
   * @param listing
   *  The array of items
   * @param template
   *  The string name of the template
   *
   * @returns {Array}
   *  An array of compiled markup
   */
  function transformListing(listing, template) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate(template);
    let listingMarkup = [];
    listing.forEach(function (data, index) {
      let itemData = itemTransform(data);
      listingMarkup[index] = compiledTemplate(itemData);
    });
    return listingMarkup;
  }

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
        sortedData = listing.sortDataAlphabetically(filteredData),
        place = '';

    if (ma.autocomplete.getPlace()) {
      place = ma.autocomplete.getPlace();
      sortedData = sortDataAroundPlace(place, sortedData);
    }

    // Update the results heading based on the current items state.
    sortedData.resultsHeading = listing.transformResultsHeading({data: sortedData});
    // Update pagination data structure, reset to first page
    sortedData.pagination = listing.transformPaginationData({data: sortedData}); // @todo this should probably go last so we know page #s
    // Render the listing page.
    renderListingPage({data: sortedData});

    // Preserve state of current data.
    return {
      data: sortedData,
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
    let filters = listing.transformActiveTagsData({data: data, filterData: filterData});
    // Update the results heading tags with the new active filters.
    data.resultsHeading.tags = filters;

    // If tag (checkbox) filter is present, filter based on current tag values.
    if (listing.hasFilter(filters, 'tag')) {
      // Get just the tag values from the filters array.
      let tags = listing.getFilterValues(filters, 'tag');
      // Identify active data based on filter.
      return listing.filterDataByTags(tags, data);
    }

    // Either there are no filters or the only active filter is location, make all items active
    return listing.makeAllActive(data);
  }

  /**
   * Returns transformed item data object.
   *
   * @param item
   *   The item.item[]{} being transformed.
   *
   * @returns {*}
   *   The original item object with a formatted tag property.
   */
  function itemTransform(item) {
    // Ensure tags are an array.
    let tags = [];
    $.map(item.tags, function(val, index) { tags[index] = val; });
    item.tags = tags;

    let tagsData = {
      tagsFormatted: item.tags.map(transformTag)
    };
    return Object.assign({},item,tagsData);
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
    let lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

    // Get all existing marker distance from place, assign as marker property.
    for (let key in data.items) {
      if (data.items.hasOwnProperty(key)) {
        data.items[key].distance = calculateDistance(data.items[key].data.position.lat, data.items[key].data.position.lng, lat, lng, "K");
      }
    }

    // Sort existing markers by closest to the place.
    data.items.sort(function (a, b) {
      return a.distance - b.distance;
    });

    // Update each location listing item's page number based on new marker sort order.
    let paginated = listing.paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;

    // Return the newly sorted instance of location listing masterData.
    return data;
  }

  /**
   * Calculate distance from lat/lng.
   *
   * @param lat1
   *    Latitude 1 input.
   * @param lng1
   *    Longitude 1 input.
   * @param lat2
   *    Latitude 2 input.
   * @param lng2
   *    Longitude 2 input.
   *
   * @returns {*}
   *    Return the distance from points.
   */
  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
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
    listing.clearListingPage('.js-event-listing-interactive','.js-event-listing-items');
    let $el = $('.js-event-listing-interactive').find('.js-event-listing-items'),
        page = args.page ? args.page : 1;

    args.data.items.forEach(function(item){
      if (item.isActive && item.page === page) {
        $el.append(item.markup);
      }
    });

    // Focus on the first focusable element in the first listing
    let $firstListing = $el.find('.ma__event-listing__item').first();
    // :focusable is possible with helpers/jQueryExtend.js
    $firstListing.find(':focusable').eq(0).focus();
  }


}(window,document,jQuery);
