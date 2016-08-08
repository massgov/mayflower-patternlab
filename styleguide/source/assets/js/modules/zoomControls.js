export default function (window,document,$,undefined) {

  // zoom controls updates/adds a data-zoom attribute to the html tag
  // with the desired level of zooming requeted.  CSS applies a scale
  // transform based on that value.

  $(".js-zoom-controls").each(function() {

    let $parent = $(this),
        $inputs = $(this).find('input[type="radio"]');

    $inputs.on('change',function(){
      $('html').attr("data-zoom",$(this).val());
    });

  });

}(window,document,jQuery);