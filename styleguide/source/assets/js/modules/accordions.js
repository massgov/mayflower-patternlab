export default function (window,document,$,undefined) {

  $('.js-section-accordion').each(function(){
    let $el = $(this);

    $el.find('.js-section-accordion-link').on('click',function(e){
      if(window.innerWidth <= 480) {
        e.preventDefault();
        $el.toggleClass('is-open');
      }
    })
  });

}(window,document,jQuery);