import sticky from "../helpers/sticky.js";

export default function (window,document,$,undefined) {

  $('.js-location-listing').each(function(){
    let $el = $(this),
      $map = $el.find('.js-location-listing-map');

    sticky.init($map);

    // find the location link
    $el.find('.js-location-listing-link').each(function(index) {
      let $link = $(this);

      $link.on('click', function(e){
        e.preventDefault();
        // when link is clicked 
        // trigger map to recenter on this item based on it's index.
        let $map = $el.find('.js-google-map'),
          position = $map.offset().top;

        $map.trigger('recenter',index);
        // focus on the map
        $("html,body").stop(true,true).animate({scrollTop:position}, '750');
      });
    });

  });
}(window,document,jQuery);

