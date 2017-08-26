import listings from "../helpers/listing.js";

export default function (window,document,$,undefined) {
  let container = '.js-event-listing-interactive',
      parent = '.js-event-listing-items',
      row = '.js-event-listing-item';

  $('.js-event-listing-interactive').each(function(i) {
    let $el = $(this),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
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

      masterData.pagination = listings.transformPaginationData({data: masterData, targetPage: nextPage});
      masterData.resultsHeading = listings.transformResultsHeading({data: masterData, page: nextPage});
      listings.renderListingPage({data: masterData, page: nextPage});

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
     *   The listing data structure to use as a source
     * @returns {Array}
     *   An array with the following structure:
     *    [
     *      maxItems: the max number of items to show per listing "page" if provided, defaults to all
     *      totalPages: the number of pages of items that should render, given the current filters
     *      resultsHeading: the data structure necessary to render a resultsHeading component
     *      items: an array of listing items [
     *        isActive: whether or not the listing should be shown, given current filters state
     *        page: the page that the listing, if active, will appear on, given the current sort order
     *        data: the data structure for the eventTeaser component
     *        markup: the compiled eventTeaser markup
     *        start: the momentjs object for the start date
     *      ]
     *      pagination: the data structure necessary to render a pagination component,
     *      selectors: the necessary $selectors for rendering the listing
     *    ]
     */
    function populateMasterDataSource(listing) {
      // Populate master data structure
      let masterData = [];

      // Ensure locationListing.imagePromos.items is an array (the twig template json_encode()'s a php array)
      let listArray = [];
      $.map(listing.eventListing.events, function(val, index) {
        listArray[index] = val;
      });

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
      masterListingMarkup = listings.transformListing(masterListing, 'eventListingRow');

      // The max number of items per page, if designated in locationListing data structure, else all
      masterData.maxItems = listing.maxItems ? listing.maxItems : masterListing.length;

      // The initial results heading data structure
      masterData.resultsHeading = listing.resultsHeading;

      // Create items with listing and markup.
      masterData.items = getMasterListingWithMarkup(masterListing, masterListingMarkup, masterData.maxItems);

      // The initial pagination data structure + currentPage;
      masterData.pagination = listing.pagination;
      masterData.pagination.currentPage = currentPage;

      // The total number of pages, given the number of items and the maxItems variable
      masterData.totalPages = Math.ceil(masterData.items.length / masterData.maxItems);

      // Set the selector properties necessary to render
      masterData.selectors = {};
      masterData.selectors.container = container;
      masterData.selectors.parent = parent;
      masterData.selectors.row = row;

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
     *      data: the data structure for the eventListing component
     *      markup: the compiled imagePromo markup
     *      start: the start momentjs object for this item
     *   ]
     */
    function getMasterListingWithMarkup(listing, markup, max) {
      let items = [];
      listing.forEach(function (item, index) {
        // determine if there is an end date to this event
        let endDate = listing[index].date.endDay.length;

        items[index] = {
          isActive: true, // @todo consider checking for this in case of server side preprocessing of state
          page: Math.ceil((index+1) / max),
          markup: markup[index],
          data: listing[index],
          start: listings.makeMoment({data: listing[index].date, type: 'start'}),
          end: (endDate) ? listings.makeMoment({data: listing[index].date, type: 'end'}) : endDate
        };
      });
      return items;
    }

  });

  /**
   * The main data transformation wrapper, returns an instance of masterData which reflects the component state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param transformation
   *  An object representing the change in state (locationFilter form data, resultsHeading tag interaction, etc.)
   *
   * @returns {{data: *, place: *}}
   *  An object with the current state masterData instance and an array of their related sorted markers to send to map.
   */
  function transformData(data, transformation) {
    // First filter the data based on component state, then sort alphabetically by default.
    let filteredData = listings.filterListingData(data, transformation),
        sortedData = listings.sortDataByDate(filteredData),
        place = '';

    // Sort data by location, if that filter is present.
    if (listings.hasFilter(filteredData.resultsHeading.tags, 'location')) {
      place = listings.getFilterValues(filteredData.resultsHeading.tags, 'location')[0]; // returns array
      // If place argument was selected from the locationFilter autocomplete (initiated on the zipcode text input).
      if (ma.autocomplete.getPlace()) {
        place = ma.autocomplete.getPlace();
        sortedData = sortDataAroundPlace(place, sortedData);
      }
      // If place argument was populated from event/locationFilter (zipcode text input) but not from Place autocomplete.
      else {
        // Geocode the address, then sort the markers and instance of locationListing masterData.
        ma.geocoder = ma.geocoder ? ma.geocoder : new google.maps.Geocoder();
        // @todo limit geocode results to MA?
        sortedData = listings.geocodeAddressString(place, sortDataAroundPlace, filteredData);
      }
    }

    // Update the results heading based on the current items state.
    sortedData.resultsHeading = listings.transformResultsHeading({data: sortedData});
    // Update pagination data structure, reset to first page
    sortedData.pagination = listings.transformPaginationData({data: sortedData}); // @todo this should probably go last so we know page #s
    // Render the listing page.
    listings.renderListingPage({data: sortedData});

    // Preserve state of current data.
    return {
      data: sortedData,
      place: place
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
        data.items[key].distance = listings.calculateDistance(data.items[key].data.position.lat, data.items[key].data.position.lng, lat, lng, "K");
      }
    }

    // Sort existing markers by closest to the place.
    data.items.sort(function (a, b) {
      return a.distance - b.distance;
    });

    // Update each location listing item's page number based on new marker sort order.
    let paginated = listings.paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;

    // Return the newly sorted instance of location listing masterData.
    return data;
  }

}(window,document,jQuery);
