import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // Only run this code if there is a google map component on the page.
  if(!$('.js-google-map').length || typeof googleMapData === 'undefined'){
    return;
  }

  let compiledTemplate = getTemplate('googleMapInfo'),
    max = '', // updated per instance
    mapInitialized = false;

  // Test for presence of google maps default library, loaded in the <head> with api key
  let checkForGoogleMaps = setInterval(function() {
    // if (window.googleMapsLoaded) {
    if (window.google && window.google.maps && !mapInitialized) {
      initMap();
    }
  }, 100);

  // after the api is loaded this function is called
  function initMap () {
    // Stop checking for google maps library.
    mapInitialized = true;
    clearInterval(checkForGoogleMaps);

    $(".js-google-map").each(function(i) {
      const $el = $(this);

      // get the maps data
      // this could be replaced with an api
      const rawData = googleMapData[i];
      max = (window.locationListing[i] && window.locationListing[i].maxItems) ? window.locationListing[i].maxItems : googleMapData[i].markers.length;

      // *** Create the Map *** //
      // map defaults
      const initMapData = {
        scrollwheel: false
      };
      // create map Data by combining the rawData with the defaults
      const mapData = Object.assign({}, rawData.map, initMapData);
      const map = new google.maps.Map(this, mapData);
      let markers = [];
      let bounds = new google.maps.LatLngBounds();

      // *** Add master Markers with popups *** //
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

      // Make the map zoom to fit the bounds, showing all locations.
      map.fitBounds(bounds);

      $el.on("recenter", function (event, markerIndex) {
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
      // Listen for listing marker bounce command
      $el.on("bounce", function( event, markerIndex ) {
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
      
      $el.trigger('ma:GoogleMap:MapInitialized', [markers]);

      /**
       * Location Listing config, event listeners
       */
      // Set location listing specific config
      let $locationListing = $el.parents('.js-location-listing'); // context
      $locationListing.on('ma:LocationListing:ListingInitialized', function(e) {
        // Set up google geocoder class
        window.geocoder = new google.maps.Geocoder();

        // Listen for data change event to update markers by place or filters.
        $locationListing.on("ma:LocationListing:UpdateMarkers", function (e, args) {
          if (args.place) {
            updateMapByPlace({data: args.data, place: args.place, map: map, markers: markers, page: args.page});
          }
          else {
            updateMapByMarkers({data: args.data, map: map, markers: markers, page: args.page});
          }
        });
      });
    });
  }

  function infoTransform(data) {
    let infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({},data,infoData);
  }

  function formatPhone(phone) {
    let phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  function updateMapByPlace(args) {
    removeMarkersFromMap(args.markers);

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds(),
      sortedData = [];

    if (args.place = autocomplete.getPlace()) {
      sortedData = sortDataAroundPlace(args.place, args.data);
      // Get the location points based on the place value.
      bounds.extend(args.place.geometry.location);
    }
    else {
      window.geocoder = window.geocoder ? window.geocoder : new google.maps.Geocoder();
      sortedData = geocodeAddressString(args.place, sortDataAroundPlace, args.data);
    }

    let page = args.page ? args.page : 1;
    let placeMarkers = getMarkers(sortedData, args.markers, page);

    // If we want to sort + filter within a distance radius
    if (args.hasOwnProperty('radius')) {
      // Filter down to those locations <= 25 miles away.
      placeMarkers = filterMarkersByMilesRadius(placeMarkers, args.radius);
    }

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkers(placeMarkers, args.map, bounds);

    $('.js-location-listing').trigger("ma:LocationListing:MarkersSorted", [sortedData]);
  }

  function updateMapByMarkers(args) {
    removeMarkersFromMap(args.markers);
    let pageNumber = args.page ? args.page : 1;
    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds(),
      filteredMarkers = getMarkers(args.data, args.markers, pageNumber);

    addMarkers(filteredMarkers, args.map, bounds);

    // If there is only one marker, zoom out to provide some context.
    if (filteredMarkers.length === 1) {
      args.map.setZoom(16);
    }

    $('.js-location-listing').trigger("ma:LocationListing:MapMarkersUpdated", [filteredMarkers]);
  }

  function geocodeAddressString(address, fn, arg) {
    if (typeof window.geocoder === "undefined") {
      return;
    }
    // Wrap it in a function so it is not called asynchronously.
    return geocoder.geocode({address: address}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        return fn(results[0], arg);
      }
      else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function sortDataAroundPlace(place, data) {
    // Get distance number on all existing markers.
    for (var key in data.items) {
      if (data.items.hasOwnProperty(key)) {
        data.items[key].marker.distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, data.items[key].marker.getPosition());
      }
    }

    // Sort existing markers to get the closest locations.
    data.items.sort(function (a, b) {
      return a.marker.distance - b.marker.distance;
    });

    data.items = updatePageNumbers(data.items);

    return data;
  }

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

  function removeMarkersFromMap(markers) {
    for(i=0; i<markers.length; i++){
      markers[i].setMap(null);
    }
  }

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

    // Trim the excess markers
    return markers.slice(0,dataMarkers.length);
  }

  function addMarkers(markers, map, bounds) {
    let maxItems = markers.length < max ? markers.length : max;

    for (var i = 0; i < maxItems; i++) {
      markers[i].setMap(map);
      // Extend the bounds to include each marker's position.
      bounds.extend(markers[i].position);
    }

    // Make the map zoom to fit the bounds, showing all locations.
    map.fitBounds(bounds);
  }

  function initMarker(map, marker, markerData) {
    let infoData = infoTransform(markerData.infoWindow);
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

  function convertMetersToMiles(distance) {
    return distance * 0.000621371192;
  }

  function filterMarkersByMilesRadius(markers, distance) {
    return markers.filter(function(marker){
      return Math.round(convertMetersToMiles(marker.distance)) <= distance;
    });
  }

}(window,document,jQuery);
