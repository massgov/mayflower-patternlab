import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  let listing = $('.ma__event-listing__items');
  let submitButton = $('.ma__event-filters__submit');
  let resultsHeader = $('.ma__results-heading__title');
  let eventsList = ma.eventListing[0]['events'];
  let totalItems = eventsList.length;
  let pagination = $('.js-pagination');
  let currentPage = 0;
  let maxItems = 8;
  let numberedPages = '';
  let pages = [];

  if (totalItems < eventsList.length) {
    resultsHeader.text('Showing 1 of ' + eventsList.length + ' Results');
  }
  else {
    resultsHeader.text('Showing 1 - ' + maxItems + ' of ' + eventsList.length + ' Results');
  }
  // Render init list.
  renderList(eventsList, maxItems);

  // Load pager.
  $('.ma__pagination__page').remove();
  pages.forEach(function (value, index) {
    numberedPages += '<button class="ma__pagination__page js-pagination-page " type="button" data-page="' + ++index + '">' + index + '</button>';
  });
  $('.ma__pagination__prev').after(numberedPages);

  // Build our autocomplete.
  $(document).on('ma:LibrariesLoaded:GoogleMaps', function() {
    let $locationFilter = $('.ma__event-filters').find('input');
    if ($locationFilter.length) {
      // Create the google places autocomplete object and associate it with the zip code text input.
      let locationInput = document.getElementById($locationFilter.attr('id'));
      let defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(40.727093,-73.97864), new google.maps.LatLng(43.004778, -69.845299));

      // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
      let options = {
        types: ['geocode'],
        componentRestrictions: {country: 'us'}
      };
      ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);
    }
  });

  pagination.on('ma:Pagination:Pagination', function(e, target) {
    "use strict";
    $(e.target).find('.ma__pagination__page').removeClass('is-active');
    if (target === "next") {
      currentPage++;
    }
    if (target === "previous") {
      currentPage--;
    }
    if (typeof target == 'number') {
      $(e.target).find('[data-page=' + target + ']').addClass('is-active');
      currentPage = --target;
    }
    if (pages[currentPage] !== undefined) {
      // Reload display.
      listing.empty();
      pages[currentPage].forEach(function (value, index) {
        let compiledTemplate = getTemplate('eventListingRow');
        listing.append(compiledTemplate(value));
      });
    }
    else {
      currentPage = 0;
    }
  });

  submitButton.on('click', function(e) {
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
      eventsList[index]['distance'] = calculateDistance(value.position.lat,value.position.lng,lat,lng, "K");
    });
    // Sort array by distance.
    eventsList.sort(function(a, b) { return parseFloat(a.distance) - parseFloat(b.distance) } );
    renderList(eventsList, maxItems);
  });

  function renderList(list, maxItems) {
    "use strict";
    // Reload pages variable and load 8 per page.
    pages = list.map(function(e,i){
      return i%maxItems===0 ? list.slice(i,i+maxItems) : null;
    }).filter(function(e){ return e; });

    // Init load.
    listing.empty();
    pages[0].forEach(function (value, index) {
      let compiledTemplate = getTemplate('eventListingRow');
      listing.append(compiledTemplate(value));
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
