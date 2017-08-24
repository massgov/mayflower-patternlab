import getTemplate from "../helpers/getHandlebarTemplate.js";
import listing from "../helpers/listing.js";

export default function (window,document,$,undefined) {
  $('.js-event-listing-interactive').each(function(i) {
    let $el = $(this),
        $resultsHeading = $el.find('.js-results-heading'),
        $pagination = $el.find('.js-pagination'),
        $eventFilter = $el.find('.js-event-filters');

    // Get the location listing component data (this could be replaced with an api)
    const rawData = ma.eventListingInteractive[i]; // Data object created in @organisms/by-author/event-listing-interactive.twig
    let masterData = rawData;
    // ^^ calculate total pages, set maxItems, cache event markup form templates, with this data structure.
    masterData.totalPages = 2; // needs to be configured based on total results, maxItems

    // let eventListing = $('.ma__event-listing__items');
    let submitButton = $('.ma__event-filters__submit');
    // let resultsHeader = $('.ma__results-heading__title');
    let eventsList = masterData['eventListing']['events'];
    let totalItems = eventsList.length;
    let currentPage = 0; // don't need this because you'll render 1st time via twig then this will be passed
    let maxItems = 8;
    let numberedPages = '';

    // Build our autocomplete.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function () {
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

      let pagination = listing.transformPaginationData({data: masterData, targetPage: nextPage});

      $pagination.trigger('ma:Pagination:DataUpdated', [pagination]);
    });

    // vvv I'd put this filter click event stuff in it's own JS file see modules/locationFilter.js
    submitButton.on('click', function (e) {
      "use strict";
      e.preventDefault();
      // Get autocomplete data.
      let place = ma.autocomplete.getPlace();
      // Autocomplete not right.
      if (typeof place === "undefined" || !place.geometry) {
        return;
      }
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
    });
  });

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
