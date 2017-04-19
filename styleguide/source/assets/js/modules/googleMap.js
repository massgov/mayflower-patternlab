import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // only run this code if there is a google map component on the page
  if(!$('.js-google-map').length || typeof googleMapData === 'undefined'){
    return;
  }

  let compiledTemplate = getTemplate('googleMapInfo');

  // after the api is loaded this function is called
  window.initMap = function() {

    $(".js-google-map").each(function(i) {
      const $el = $(this);

      // get the maps data
      // this could be replaced with an api
      const rawData = googleMapData[i];
      
      // *** Create the Map *** //
      // map defaults
      const initMapData = {
        scrollwheel: false
      }
      // create map Data by combining the rawData with the defaults
      const mapData = Object.assign({}, rawData.map, initMapData);

      const map = new google.maps.Map(this, mapData);

      let markers = [];

      // *** Add Markers with popups *** //
      rawData.markers.forEach(function(d,i){
        let markerData = Object.assign({map},d);

        let marker =  new google.maps.Marker(markerData);

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
        }
        
        marker.hideInfo = () => {
          infoWindow.close(map, marker);
          marker.open = false;
        }

        marker.bounce = () => {
          clearTimeout(markerBouncing);
          marker.setAnimation(null);
          marker.setAnimation(google.maps.Animation.BOUNCE);
          markerBouncing = setTimeout(() => {
            marker.setAnimation(null);
          },3000);
        }

        markers.push(marker);
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
        // center the map on this marker      
        map.setCenter(marker.getPosition());
        // make the marker bounce three times
        marker.bounce();
      });    
    });
  }

  function infoTransform(data) {
    let infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    }
    return Object.assign({},data,infoData);
  }

  function formatPhone(phone) {
    let phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  // load Google's api
  var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyC-WIoNfS6fh7TOtOqpDEgKST-W_NBebTk&callback=initMap";
    document.getElementsByTagName('head')[0].appendChild(script);


}(window,document,jQuery);
