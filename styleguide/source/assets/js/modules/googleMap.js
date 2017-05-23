import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // Only run this code if there is a google map component on the page.
  if(!$('.js-google-map').length || typeof googleMapData === 'undefined'){
    return;
  }

  // Initialize global (at component scope) map properties
  let max = false, // Maximum number of map markers per map, can be updated instance
    mapsInitialized = false; // Flag to set to trigger clearInterval(checkForGoogleMaps)

  /**
   * Test for presence of google maps default library (without geocode, places, etc.) until we find it.
   * Loaded in _meta/_01.foot.twig with static api key
   * @todo set up config to pull in dynamic api key
   */
  let checkForGoogleMaps = setInterval(function() {
    if (window.google && window.google.maps && !mapsInitialized) {
      initMaps();
    }
  }, 100);

  // Stop checking for google maps library after 2 minutes
  let stopChecking = setTimeout(function() {
    clearInterval(checkForGoogleMaps);
  }, 2 * 60 * 1000);

  // Initialize the map
  function initMaps () {
    // Stop checking for google maps library.
    mapsInitialized = true;
    clearInterval(checkForGoogleMaps);
    clearTimeout(stopChecking);

    $(".js-google-map").each(function(i) {
      const $el = $(this);
      // @todo consider adding maxItems property to googleMap data structure
      max = (window.locationListing && window.locationListing[i].maxItems) ? window.locationListing[i].maxItems : googleMapData[i].markers.length;

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
          let markerData = {
            position: new google.maps.LatLng({
              lat: rawData.markers[key].position.lat,
              lng: rawData.markers[key].position.lng
            }),
            label: rawData.markers[key].label,
            infoWindow: rawData.markers[key].infoWindow,
            _listingKey: key // relationship key between markers + listings
          };

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
        // Listen for data change event to update markers by filters.
        $locationListing.on("ma:LocationListing:UpdateMarkers", function (e, args) {
          // Update map based on pre-sorted markers order
          updateMapByMarkers({
            dataMarkers: args.markers,
            map: map,
            markers: markers,
            place: args.place ? args.place : false
          });
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
   * Renders a new map, with markers  reference to passed marker order and length.
   *
   * @param args
   *  arguments object:
   *    {
   *      dataMarkers: args.markers, // sorted array of markers by witch to sort and filter master markers
   *      map: map, // initialized map instance
   *      markers: markers, // master list of markers (relates to location listing master data on _listingKey)
   *      place: args.place, // location filter place input

   *    }
   */
  function updateMapByMarkers(args) {
    removeMarkersFromMap(args.markers);

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds();
    if (args.place && autocomplete.getPlace()) {
      // Ensure the map includes the provided location based on the place value.
      bounds.extend(args.place.geometry.location);
    }

    // Filter the markers based on pre-sorted, flagged location listing instance of masterData.
    let filteredMarkers = getActiveMarkers({dataMarkers: args.dataMarkers, markers: args.markers});

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
   *
   * @param data
   *   Given instance of location listing masterData.
   * @param markers
   *   Array of map marker objects.
   * @param page
   *   Given page of data items by which to get markers.
   */
  function getActiveMarkers(args) {
    let dataMarkers = args.dataMarkers,
      markers = args.markers;

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

}(window,document,jQuery);
