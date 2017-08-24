import getTemplate from "../helpers/getHandlebarTemplate.js";
import listing from "../helpers/listing.js";

export default function (window,document,$,undefined) {
  $('.js-event-listing-interactive').each(function(i) {
    let $el = $(this),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
        $eventFilter = $el.find('.js-event-filters'),
        $events = $el.find('.js-event-listing-items');

    /**
     * Initialize Data (for results heading, events, and pagination.
     */
    // Get the location listing component data (this could be replaced with an api)
    const rawData = ma.eventListingInteractive[i]; // Data object created in @organisms/by-author/event-listing-interactive.twig
    let masterData = rawData; // this should change to = initMasterData(rawData), see below.
    // ^^ This data structure should now have resultsHeading, eventFilters, pagination, and event data.  So at this point you can create the master data structure:
    /**
     * [
     *    maxItems: the max number of items to show per listing "page" if provided, defaults to all
     *    totalPages: the number of pages of items that should render, given the current filters
     *    resultsHeading: the data structure necessary to render a resultsHeading component
     *    items: an array of listing items [
     *      isActive: whether or not the listing should be shown, given current filters state
     *      page: the page that the listing, if active, will appear on, given the current sort order
     *      event: the data structure for the event-teaser component // might need to abstract this to be "data" if need to share code with location listing (imagePromo)
     *      markup: the compiled event-teaser markup (from handlebars)
     *    ]
     *    pagination: the data structure necessary to render a pagination component
     *  ]
     */
    // See the "Data initialization." functions in location listing js
    masterData.totalPages = 2; // needs to be configured based on total results, maxItems

    // These will likely go away once you create the master data structure
    // let eventListing = $('.ma__event-listing__items');
    let submitButton = $('.ma__event-filters__submit');
    // let resultsHeader = $('.ma__results-heading__title');
    let eventsList = masterData['eventListing']['events'];
    let totalItems = eventsList.length;
    let currentPage = 0; // don't need this because you'll render 1st time via twig then this will be passed
    let maxItems = 8; // 10 or 20 might be better for this since there's no map UI constraints
    let numberedPages = '';


    // This event filter init stuff should probably be encapsulated in to eventFilter module js
    // See modules/locationFilters.js
    // Build our autocomplete.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function () {
      // nice-to-have: abstract out what we do for both zip filters into the helper listing.js
      let $locationFilter = $('.ma__event-filters').find('input');
      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        let locationInput = document.getElementById($locationFilter.attr('id'));
        let defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(40.727093, -73.97864), new google.maps.LatLng(43.004778, -69.845299));

        // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        let options = {
          types: ['geocode'],
          componentRestrictions: {country: 'us'}
        };
        ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);
      }
    });

    /**
     * Handle events from eventFilters (zip sort), resultsHeading (clear zip sort), and pagination
     */

    // Handle active filter/tag button interactions (triggered by resultsHeading.js).
    $resultsHeading.on('ma:ResultsHeading:ActiveTagClicked', function (e, clearedFilter) {
      // This will mean a sort / filter has been removed / cleared.

      // Empty current listing events
      listing.clearListingPage($el, $events);

      // transform page data (likely reset to default sort) - based on clearedFilter
      // transform results heading data - based on clearedFilter
      // transform pagination data - based page data / on clearedFilter
      // emit events to resultsHeading, pagination, and render new page of event data
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

      // Empty current listing events
      listing.clearListingPage($el, $events);

      // determine the group of events for the next page
      // render the page of events
      // determine the results heading data
      // trigger the event for the results heading, passing data

      // Determine pagination data structure based on event
      let pagination = listing.transformPaginationData({data: masterData, targetPage: nextPage});
      // Trigger event for pagination, passing data
      $pagination.trigger('ma:Pagination:DataUpdated', [pagination]);

    });

    // This submitButton.on() should update to listen for events emitted by modules/eventFilters js
    // See modules/locationFilters.js to model filter events
    // For example:
    // Handle location event form interaction (triggered by eventFilters.js).
    // $locationFilter.on('ma:EventFilter:FormSubmitted', function (e, formValues) {
    submitButton.on('click', function (e) {
      "use strict";
      e.preventDefault();
      // This autocomplete data should be determined in eventFilter.js, which should send a data object like locationFilters.js @#72
      // Get autocomplete data.
      let place = ma.autocomplete.getPlace();
      // Autocomplete not right.
      if (typeof place === "undefined" || !place.geometry) {
        return;
      }
      // I would send that ^ place data as an event (see comment above)
      // Then I'd encapsulate this sort functionality below into a help
      let lat = place.geometry.location.lat(),
          lng = place.geometry.location.lng();
      // Sort events by autocomplete location and get distance.
      eventsList.forEach(function (value, index) {
        eventsList[index]['distance'] = calculateDistance(value.position.lat, value.position.lng, lat, lng, "K");
      });
      // Sort array by distance.
      eventsList.sort(function (a, b) {
        return parseFloat(a.distance) - parseFloat(b.distance)
      });

      renderList(eventsList, maxItems);
      // Transform pagination data - reset back to first page
      // Transform results heading - reset back to first page of results, of total; apply filter tag
      // updateChildComponents(args);
    });
  });

  /**
   * Helper functions - data transformation (for events) and rendering
   */

  // This is good to keep here
  function renderList(list, maxItems) {
    "use strict";
    // Reload pages variable and load 8 per page.
    pages = list.map(function(e,i){
      return i%maxItems===0 ? list.slice(i,i+maxItems) : null;
    }).filter(function(e){ return e; });

    // Init load.
    eventListing.empty();
    pages[0].forEach(function (value, index) {
      let compiledTemplate = getTemplate('eventListingRow'); // cache this above in masterData
      eventListing.append(compiledTemplate(value));
    });
  }

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

}(window,document,jQuery);
