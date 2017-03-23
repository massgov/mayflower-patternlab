import checkActive from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(){
    let $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $el.attr('aria-expanded',open);

    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        open = $el.hasClass('is-open');
        if(open){
          $content.stop(true,true).slideUp();
        } else {
          $content.stop(true,true).slideDown();
        }
        $el.attr('aria-expanded',!open).toggleClass('is-open');
      }
    })

    $(window).resize(function () {
      let temp = checkActive($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $el.attr('aria-expanded','false');
      }

      active = temp;
    }).resize();
  });

}(window,document,jQuery);