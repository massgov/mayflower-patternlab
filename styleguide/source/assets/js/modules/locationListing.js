import sticky from "../helpers/sticky.js";

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
      $map = $el.find('.js-location-listing-map');

    sticky.init($map);

    // find the location link
    $el.find('.js-location-listing-link').each(function(index) {
      let $link = $(this);

      $link.on('click', function(){
        // when link is clicked 
        // trigger map to recenter on this item based on it's index.
        $el.find('.js-google-map').trigger('recenter',index);
      });
    });

  });
}(window,document,jQuery);

