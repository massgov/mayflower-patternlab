export default function (window,document,$,undefined) {

  // zoom controls updates/adds a data-zoom attribute to the html tag
  // with the desired level of zooming requeted.  CSS applies a scale
  // transform based on that value.

  $(".js-zoom-controls").each(function() {

    let $parent = $(this),
        $inputs = $(this).find('input[type="radio"]');

    $('html').attr("data-zoom", getCurrentValue());

    $inputs.on('change',function(){
      $('html').attr("data-zoom", $(this).val());
    });

    $parent.on('reset',function(){
      $('html').attr("data-zoom", getCurrentValue());
    });

    function getCurrentValue() {
      return $parent.find('input[type="radio"]:checked').val();
    }

  });

}(window,document,jQuery);