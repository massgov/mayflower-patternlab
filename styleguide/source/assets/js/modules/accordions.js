import checkActive from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(index){
    let $el = $(this),
        id = $el.attr('id') || 'accordion' + (index + 1),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $el.attr('id', id);
    $link.attr('aria-expanded',open).attr('aria-controls', id);

    if(open) {
      // setup the inline display block
      $content.stop(true,true).slideDown();
    }

    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        open = $el.hasClass('is-open');
        if(open){
          $content.stop(true,true).slideUp();
        } else {
          $content.stop(true,true).slideDown();
        }
        $link.attr('aria-expanded',!open);
        $el.toggleClass('is-open');
      }
    })

    $(window).resize(function () {
      let temp = checkActive($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $link.attr('aria-expanded','false');
      }

      active = temp;
    }).resize();
  });

}(window,document,jQuery);