export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(){
    let $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = refreshValue($el);

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
      let temp = refreshValue($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
      }

      active = temp;
    }).resize();
  });

  function refreshValue($el) {
    let value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch(err) {}
    return value === "false" ? false : true;
  };

}(window,document,jQuery);