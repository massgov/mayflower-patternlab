import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // only run this code if there is a google map component on the page
  if(!$('.js-google-map').length || typeof googleMapData === 'undefined'){
    return;
  }

  let compiledTemplate = getTemplate('googleMapInfo');

  // after the api is loaded this function is called
  window.initMap = renderMap;

  if (typeof google !== "undefined" && typeof locationListing !== "undefined") {
    window.geocoder = new google.maps.Geocoder();
    // Keep track of the bounds so we can adjust based on markers.
  }

  function renderMap() {

    $(".js-google-map").each(function(i) {
      const $el = $(this),
        $locationListing = $el.parents('.js-location-listing');

      // get the maps data
      // this could be replaced with an api
      const rawData = googleMapData[i];
      const max = maxItems ? maxItems : googleMapData[i].markers.length;

      // *** Create the Map *** //
      // map defaults
      const initMapData = {
        scrollwheel: false
      };
      // create map Data by combining the rawData with the defaults
      const mapData = Object.assign({}, rawData.map, initMapData);
      const map = new google.maps.Map(this, mapData);
      let markers = [];

      // *** Add Markers with popups *** //
      for (var key in rawData.markers) {
        if (rawData.markers.hasOwnProperty(key)) {
          var markerData = Object.assign({
            position: new google.maps.LatLng({
              lat: rawData.markers[key].position.lat,
              lng: rawData.markers[key].position.lng}),
            label: rawData.markers[key].label,
            infoWindow: rawData.markers[key].infoWindow,
            _listingKey: key // relationship key between markers + listings
          });

          var marker = new google.maps.Marker(markerData);

          // Set properties, listeners on each marker.
          initMarker(map, marker, markerData);
        }

          // Add up to the maxItems of markers to the map.
          if(markers.length < max) {
            marker.setMap(map);
          }

          // Add marker to array of all markers.
          markers.push(marker);
      }

      // Listen for location listing filter.
      $locationListing.on("maLocationListingPlaceFilter", function(e, location){
        updateMapByLocation(location, map, markers);
      });

      // Listen for location listing location reset.
      $locationListing.on("maLocationListingPlaceReset", function() {
        resetMapLocation(map, markers);
      });

      // Listen for pagination.
      $locationListing.on("maLocationListingPagination", function(e, map, markers){

      });

      // listen for recenter command
      $el.on("recenter", function( event, markerIndex ) {
        if(typeof markers[markerIndex] === "undefined") {
          return false;
        }
        let marker = markers[markerIndex];  
        // center the map on this marker      
        map.setCenter(marker.getPosition());
        // close all open infoWindows
        for (let i in markers) {
          if(markers[i].open) {
            markers[i].hideInfo();
          }
        }
        // show the infoWindow for this marker
        marker.showInfo();
      });

      // listen for bounce command
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

      // let maBounds = new google.maps.LatLngBounds({lat: 41, lng: -69});
      $locationListing.trigger('maMapInitialized');//, [maBounds]);
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

  function updateMapByLocation(location, map, markers) {
    removeMarkersFromMap(markers);
    let place = autocomplete.getPlace(),
      sortedMarkers = [];

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds();
    if (place.geometry) {
      sortedMarkers = sortMarkersAroundPlace(place, markers);
      // Get the location points from the filter.
      bounds.extend(place.geometry.location);
    }
    else {
      window.geocoder = window.geocoder ? window.geocoder : new google.maps.Geocoder();
      sortedMarkers = geocodeAddressString(location, sortMarkersAroundPlace, markers);
    }

    // Filter down to those locations <= 25 miles away.
    let filteredMarkers = filterMarkersByMilesRadius(sortedMarkers, 25);

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkers(filteredMarkers, map, bounds);

    $('.js-location-listing').trigger("maLocationMarkersSorted", [filteredMarkers]);
  }

  function resetMapLocation(map, markers) {
    removeMarkersFromMap(markers);
    let sortedMarkers = sortMarkersAlphabetically(markers);

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds();

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkers(sortedMarkers, map, bounds);

    $('.js-location-listing').trigger("maLocationMarkersSorted", [sortedMarkers]);
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

  function sortMarkersAroundPlace(place, markers) {
    // Get distance number on all existing markers.
    for (var key in markers) {
      if (markers.hasOwnProperty(key)) {
        markers[key].distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, markers[key].getPosition());
      }
    }

    // Sort existing markers to get the closest locations.
    return markers.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

    });
  }

  function removeMarkersFromMap(markers) {
    for(i=0; i<markers.length; i++){
      markers[i].setMap(null);
    }
  }

  function addMarkers(markers, map, bounds) {
    let max = markers.length < maxItems ? markers.length : maxItems;

    for (var i = 0; i < max; i++) {
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

  // load Google's api
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyD5HXUVAA4VyRXVX50taVe2hDY8hy2JSdA&callback=initMap";
  // Load additional google map api libraries if this is a location listing map.
  if (typeof locationListing !== 'undefined') {
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyD5HXUVAA4VyRXVX50taVe2hDY8hy2JSdA&libraries=geometry,places,geocoder&callback=initMap";
    // Set max number of markers, listing items per page, if provided.
    var maxItems = locationListing.maxItems;
  }
  document.getElementsByTagName('head')[0].appendChild(script);
}(window,document,jQuery);
