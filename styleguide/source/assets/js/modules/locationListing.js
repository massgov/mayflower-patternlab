import sticky from "../helpers/sticky.js";

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
      $map = $el.find('.js-location-listing-map');


    sticky.init($map);

  });
}(window,document,jQuery);

