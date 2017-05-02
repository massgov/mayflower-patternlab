import sticky from "../helpers/sticky.js";

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    sticky.init($mapCol);

    // find the location link
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
}(window,document,jQuery);

