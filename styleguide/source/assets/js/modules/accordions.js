export default function (window,document,$,undefined) {

  $('.js-section-accordion').each(function(){
    let $el = $(this),
        $link = $el.find('.js-section-accordion-link'),
        $content = $el.find('.js-section-accordion-content'),
        active = refreshValue();

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
      let temp = refreshValue();

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
      }

      active = temp;
    }).resize();
  });

  function refreshValue() {
    let value = window.getComputedStyle(document.querySelector('.js-section-accordion'), ':before').getPropertyValue('content').replace(/\"/g, '');
    return value === "false" ? false : true;
  };

}(window,document,jQuery);