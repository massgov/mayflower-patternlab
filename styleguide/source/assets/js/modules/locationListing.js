import sticky from "../helpers/sticky.js";
import getTemplate from "../helpers/getHandlebarTemplate.js";
import getSvgFromPath from "../helpers/getSvgFromPath.js"

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // Set up click, hover handlers for location listing links.
    $el.find('.js-location-listing-link').each(function(index) {
      let $link = $(this);

      // when link is clicked 
      $link.on('click', function(){
        // trigger map to recenter on this item based on it's index.
        $map.trigger('recenter',index);
        // mark this link as active
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        // focus on the map - mainly for mobile when it is stacked
        let position = $map.offset().top;
        $("html,body").stop(true,true).animate({scrollTop:position}, '750');
      });

      // when link is hovered
      $link.on('mouseenter', function(){
        // trigger map to recenter on this item and make the marker bounce
        $map.trigger('bounce',index);
      });
    });

  });

  // Ensure that locationListing variable was written successfully in location-listing twig template.
  if (typeof locationListing !== "undefined") {
    let listingMarkup = transformLocationListingPromos(locationListing.imagePromos.items);
  }

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

}(window,document,jQuery);
