import checkActive from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(){
    let $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = checkActive($el);

    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        if($el.hasClass('is-open')){
          $content.stop(true,true).slideUp();
        } else {
          $content.stop(true,true).slideDown();
        }
        $el.toggleClass('is-open');
      }
    })

    $(window).resize(function () {
      let temp = checkActive($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
      }

      active = temp;
    }).resize();
  });

}(window,document,jQuery);