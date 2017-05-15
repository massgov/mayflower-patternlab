import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";
import getSvgFromPath from "../helpers/getSvgFromPath.js"

export default function (window,document,$,undefined) {

  // Only run this code if we have a js object from location-listing.twig with location listing data.
  if (typeof locationListing === "undefined") {
    return;
  }

  let maxItems = locationListing.maxItems ? locationListing.maxItems : locationListing.imagePromos.items.length,
    listing = [],
    listingMarkup = [];

  $('.js-location-listing').each(function(){
    let $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // Set up click, hover handlers for location listing links.
    // $el.find('.js-location-listing-link').each(function(index) {
    //   let $link = $(this);

      // when link is clicked
      $el.on('click', '.js-location-listing-link', function(e){
        let index = $(e.currentTarget).index();
        // trigger map to recenter on this item based on it's index.
        $map.trigger('recenter',index);
        // mark this link as active
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');
        $(e.currentTarget).addClass('is-active'); // in case the event is triggered on a child element.
        // focus on the map - mainly for mobile when it is stacked
        let position = $map.offset().top;
        $("html,body").stop(true,true).animate({scrollTop:position}, '750');
      });

      // when link is hovered
      $el.on('mouseenter', '.js-location-listing-link', function(e){
        // remove active state from previously selected list item
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');

        let index = $(e.currentTarget).index();
        // trigger map to recenter on this item and make the marker bounce
        $map.trigger('bounce',index);
      });
    // });

    $el.on('maMapInitialized', function() {
      listing = locationListing.imagePromos.items;
      listingMarkup = transformLocationListingPromos(locationListing.imagePromos.items);
    });

    // Handle location listings filter event (triggerd by locationFilters.js).
    $el.on('maLocationListingFilter', function(e, location, tags) {
      if (location){
        $el.trigger('maLocationListingPlaceFilter', [location]);
      }
    });

    // Handle map update, marker sort event (triggered by googleMap.js).
    $el.on('maLocationMarkersSorted', function(e, markers) {
      clearListingPage();
      // Render our new sorted location listing.
      let sortedListingMarkup = sortListingMarkupOnMarkersOrder(markers);
      renderListingPage(sortedListingMarkup.slice(0, maxItems));
    });

  });

  // Create new array with generated markup for location listing items, preserving original index.
  function transformLocationListingPromos(promos) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate('locationListingRow');
    let listingMarkup = [];
    promos.map(function (data, index) {
      let promoData = promoTransform(data);
      listingMarkup[index] = compiledTemplate(promoData);
    });
    return listingMarkup;
  }

  // Do any necessary data transformation to make imagePromo data fit locationListingRow template.
  function promoTransform(data) {
    let tagsData = {
      tagsFormatted: data.tags.map(transformTag)
    };
    return Object.assign({},data,tagsData);
  }

  // Transform tag template, get svg code from twig template path.
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromPath(tag.icon)
    };
  }

  // Reorder listingMarkup array, based on the order of the map markers.
  function sortListingMarkupOnMarkersOrder(markers) {
    let sortedListingMarkup = [];
    for (var index in markers) {
      if (markers.hasOwnProperty(index)) {
        sortedListingMarkup.push(listingMarkup[markers[index]._listingKey]);
      }
    }

    return sortedListingMarkup;
  }

  // Remove the imagePromos children content on the current location listing page.
  function clearListingPage() {
    $('.js-location-listing-results').find('.ma__image-promos').html('');
  }

  // Render new imagePromo items.
  function renderListingPage(filteredListing) {
    let $el = $('.js-location-listing-results').find('.ma__image-promos');
    filteredListing.map(function(listingRow){
      $el.append(listingRow);
    });
    sticky.init($('.js-location-listing-map'));
  }

}(window,document,jQuery);
