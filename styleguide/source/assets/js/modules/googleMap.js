import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // Only run this code if there is a google map component on the page.
  if(!$('.js-google-map').length || typeof googleMapData === 'undefined'){
    return;
  }

  // Initialize global (at component scope) map properties
  let max = false, // Maximum number of map markers per map, can be updated instance
    mapInitialized = false; // Flag to set to trigger clearInterval(checkForGoogleMaps)

  /**
   * Test for presence of google maps default library (without geocode, places, etc.) until we find it.
   * Loaded in _meta/_01.foot.twig with static api key
   * @todo set up config to pull in dynamic api key
   */
  let checkForGoogleMaps = setInterval(function() {
    if (window.google && window.google.maps && !mapInitialized) {
      initMap();
    }
  }, 100);

  // Initialize the map
  function initMap () {
    // Stop checking for google maps library.
    mapInitialized = true;
    clearInterval(checkForGoogleMaps);

    $(".js-google-map").each(function(i) {
      const $el = $(this);
      // @todo consider adding maxItems property to googleMap data structure
      max = (window.locationListing[i] && window.locationListing[i].maxItems) ? window.locationListing[i].maxItems : googleMapData[i].markers.length;

      // Get the maps data (this could be replaced with an api)
      const rawData = googleMapData[i]; // Data object created in @molecules/google-map.twig

      // *** Create the Map *** //
      // Map default config.
      const initMapData = {
        scrollwheel: false
      };
      // Create map data by combining the rawData with the defaults.
      const mapData = Object.assign({}, rawData.map, initMapData);
      // Create google map object assigned to this component instance with map data.
      const map = new google.maps.Map(this, mapData);

      // Initialize global markers, map bounds.
      let markers = [];
      let bounds = new google.maps.LatLngBounds();

      // Initialize all markers, add up to max to the map
      for (let key in rawData.markers) {
        if (rawData.markers.hasOwnProperty(key)) {
          let markerData = Object.assign({
            position: new google.maps.LatLng({
              lat: rawData.markers[key].position.lat,
              lng: rawData.markers[key].position.lng
            }),
            label: rawData.markers[key].label,
            infoWindow: rawData.markers[key].infoWindow,
            _listingKey: key // relationship key between markers + listings
          });

          let marker = new google.maps.Marker(markerData);

          initMarker(map, marker, markerData);

          // Add up to the maxItems of markers to the map.
          if (markers.length < max) {
            marker.setMap(map);
            // Extend the bounds to include each marker's position.
            bounds.extend(marker.position);
          }

          // Add marker to array of all markers.
          markers.push(marker);
        }
      }

      // Make the map zoom to fit the bounds, showing up to given max of markers.
      map.fitBounds(bounds);

      // Listen for map recenter event
      $el.on("ma:GoogleMap:MapRecenter", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        let marker = markers[markerIndex];
        // center the map on this marker
        map.setCenter(marker.getPosition());
        // close all open infoWindows
        for (let i in markers) {
          if (markers[i].open) {
            markers[i].hideInfo();
          }
        }
        // show the infoWindow for this marker
        marker.showInfo();
      });
      // Listen for map marker bounce event
      $el.on("ma:GoogleMap:MarkerBounce", function( event, markerIndex ) {
        if(typeof markers[markerIndex] === "undefined") {
          return false;
        }
        let marker = markers[markerIndex];
        // center and zoom the map on this marker
        map.setCenter(marker.getPosition());
        map.setZoom(15);
        // make the marker bounce three times
        marker.bounce();
      });

      // Trigger map initialized event, broadcast master markers.
      $el.trigger('ma:GoogleMap:MapInitialized', [markers]);

      /**
       * Location Listing config, event listeners
       */
      // Set location listing specific config, listeners
      let $locationListing = $el.parents('.js-location-listing');
      $locationListing.on('ma:LocationListing:ListingInitialized', function() {
        // Listen for data change event to update markers by place or filters.
        $locationListing.on("ma:LocationListing:UpdateMarkers", function (e, args) {
          // Is address information set to sort around
          if (args.place) {
            // Set up google geocoder class to translate street address -> geolocation data
            window.geocoder = new google.maps.Geocoder();
            // Update map by sorting markers by proximity to place, then broadcast the order.
            updateMapByPlace({data: args.data, place: args.place, map: map, markers: markers, page: args.page});
          }
          // No address information
          else {
            // Update map based on pre-sorted markers order
            updateMapByMarkers({data: args.data, map: map, markers: markers, page: args.page});
          }
        });
      });
    });
  }

  /**
   * Generic GoogleMap helper functions (used by all maps)
   */

  /**
   * Initializes a given map marker object with listeners, properties, methods.
   *
   * @param map
   *   The map object for which this is a marker.
   * @param marker
   *   The marker object to initialize.
   * @param markerData
   *   The marker's popup information.
   */
  function initMarker(map, marker, markerData) {
    let infoData = infoTransform(markerData.infoWindow);
    let compiledTemplate = getTemplate('googleMapInfo');
    let template = compiledTemplate(infoData);
    let infoWindow = new google.maps.InfoWindow({
      content: template
    });

    let markerBouncing = null;
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });

    marker.showInfo = () => {
      infoWindow.open(map, marker);
      marker.open = true;
    };

    marker.hideInfo = () => {
      infoWindow.close(map, marker);
      marker.open = false;
    };

    marker.bounce = () => {
      clearTimeout(markerBouncing);
      marker.setAnimation(null);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      markerBouncing = setTimeout(() => {
        marker.setAnimation(null);
      },3000);
    };
  }

  /**
   * Return formatted marker infowindow data.
   *
   * @param data
   *   Infowindow data object:
   *   "infoWindow": {
   *      "name": "Attleboro District Court",
   *      "phone": "15082225900",
   *      "fax": "15082233706",
   *      "email": "courts@state.ma.us",
   *      "address": "88 North Main Street\nAttleboro, MA 02703"
   *   }
   *
   * @returns {*}
   *   Object with passed data and new infoData property.
   */
  function infoTransform(data) {
    let infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({},data,infoData);
  }

  /**
   * Return phone number data formatted for map marker.
   *
   * @param phone
   *   "15082225900",
   * @returns {string}
   *    (508) 222-5900
   */
  function formatPhone(phone) {
    let phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  /**
   * Location listing specific map helper functions
   */

  /**
   * Renders a new map, with markers sorted by proximity to address argument (1 of 2 main map updates).
   *
   * @param args
   *  arguments object:
   *    {
   *      data: args.data, // transformed instance of location listing masterData
   *      place: args.place, // location filter place input
   *      map: map, // initialized map instance
   *      markers: markers, // master list of markers (relates to location listing master data on _listingKey)
   *      radius: args.radius, // (optional) number of miles to filter results by,
   *      page: args.page // (optional) current "page" of makers which should be rendered, defaults to 1
   *    }
   */
  function updateMapByPlace(args) {
    removeMarkersFromMap(args.markers);

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds(),
      sortedData = [];

    // If place argument is was selected from locationFilter autocomplete
    if (args.place = autocomplete.getPlace()) {
      // Sort the markers and instance of locationListing masterData.
      sortedData = sortDataAroundPlace(args.place, args.data);
      // Get the location points based on the place value.
      bounds.extend(args.place.geometry.location);
    }
    else {
      // If place argument was populated from locationFilter but not selected from Place autocomplete.
      window.geocoder = window.geocoder ? window.geocoder : new google.maps.Geocoder();
      // Geocode the address, then sort the markers and instance of locationListing masterData.
      sortedData = geocodeAddressString(args.place, sortDataAroundPlace, args.data);
    }

    // Default to first "page" of markers unless another was passed from location listing pagination.
    let page = args.page ? args.page : 1;

    // Get only the needed markers.
    let  placeMarkers = getMarkers(sortedData, args.markers, page);

    // If we want to sort + filter within a distance radius
    if (args.hasOwnProperty('radius')) {
      // Filter down to only those markers <= args.radius miles away.
      placeMarkers = filterMarkersByMilesRadius(placeMarkers, args.radius);
    }

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkers(placeMarkers, args.map, bounds);

    // Trigger markers sorted event and broadcast sorted data (used to update location listing image promos).
    $('.js-location-listing').trigger("ma:LocationListing:MarkersSorted", [sortedData]);
  }

  /**
   * Renders a new map, with markers sorted by proximity to address argument (2 of 2 main map updates).
   *
   * @param args
   *  arguments object:
   *    {
   *      data: args.data, // transformed instance of location listing masterData
   *      map: map, // initialized map instance
   *      markers: markers, // master list of markers (relates to location listing master data on _listingKey)
   *      page: args.page // (optional) current "page" of makers which should be rendered, defaults to 1
   *    }
   */
  function updateMapByMarkers(args) {
    removeMarkersFromMap(args.markers);

    // Default to first "page" of markers unless another was passed from location listing pagination.
    let pageNumber = args.page ? args.page : 1;

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds();

    // Filter the markers based on pre-sorted, flagged location listing instance of masterData.
    let filteredMarkers = getMarkers(args.data, args.markers, pageNumber);

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkers(filteredMarkers, args.map, bounds);

    // If there is only one marker, zoom out to provide some context.
    if (filteredMarkers.length === 1) {
      args.map.setZoom(16);
    }

    // Trigger markers updated event and broadcast filtered markers.
    $('.js-location-listing').trigger("ma:LocationListing:MapMarkersUpdated", [filteredMarkers]);
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

  /**
   * Returns instance of location listing masterData, sorted proximity to place on marker._listingKey.
   * // @todo consider keeping this functionality in locationlisting.js prior to rendering
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
    data.items = updatePageNumbers(data.items);

    // Return the newly sorted instance of location listing masterData.
    return data;
  }

  /**
   * Returns location listing masterData.items with updated page information.
   * // @todo consider keeping this functionality in locationlisting.js prior to rendering
   *
   * @param items
   *   The location listing masterData.items to be sorted.
   *
   * @return
   *   The sorted location listing masterData.items.
   */
  function updatePageNumbers(items) {
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

  /**
   * Removes passed marker objects from a given map.
   *
   * @param markers
   *   Array of map marker objects.
   */
  function removeMarkersFromMap(markers) {
    for(let i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  }

  /**
   * Returns the markers which correspond to a given "page" of a given instance of location listing masterData.
   * // @todo update this to only take array of dataMarkers
   *
   * @param data
   *   Given instance of location listing masterData.
   * @param markers
   *   Array of map marker objects.
   * @param page
   *   Given page of data items by which to get markers.
   */
  function getMarkers(data, markers, page) {
    // Get just the markers from our active sorted/filtered data listing.
    let dataMarkers = data.items.filter(function(item) {
      return item.isActive && item.page === page;
    }).map(function(item) {
      return item.marker;
    });

    // @todo initialize the data listing markers with infowindow and listeners instead of this
    // Sort the existing map markers, based on the order of the markers in the data listing.
    dataMarkers.map(function(dataMarker, index){
      // Get the current index of the marker that we want.
      let currentMarkerIndex = markers.map(function(marker) {
        return marker._listingKey;
      }).indexOf(dataMarker._listingKey);

      if (currentMarkerIndex) {
        // Swap markers items to sort.
        let tmp = markers[index];
        markers[index] = markers[currentMarkerIndex];
        markers[currentMarkerIndex] = tmp;
      }
    });

    // Return only the markers we need for this page.
    return markers.slice(0,dataMarkers.length);
  }

  /**
   * Adds markers to a given map and sets bounds based on those markers.
   *
   * @param markers
   *   Initialized map marker objects to be added.
   * @param map
   *   Initialized map object.
   * @param bounds
   *   Initialized map bounds object.
   */
  function addMarkers(markers, map, bounds) {
    // @todo see if markers.forEach would work instead
    let maxItems = markers.length < max ? markers.length : max;

    for (var i = 0; i < maxItems; i++) {
      markers[i].setMap(map);
      // Extend the bounds to include each marker's position.
      bounds.extend(markers[i].position);
    }

    // Make the map zoom to fit the bounds, showing all locations.
    map.fitBounds(bounds);
  }

  /**
   * Converts a given number of meters to miles.
   *
   * @param meters
   * @returns {number}
   *  Corresponding number of miles.
   */
  function convertMetersToMiles(meters) {
    return meters * 0.000621371192;
  }

  /**
   * Filters map markers by a given radius.
   *
   * @param markers
   *   Markers to be filtered.
   * @param radius
   *   Radius (in meters) by which to filter.
   */
  function filterMarkersByMilesRadius(markers, radius) {
    return markers.filter(function(marker){
      return Math.round(convertMetersToMiles(marker.distance)) <= radius;
    });
  }

}(window,document,jQuery);
