export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(){
    let $el = $(this);
console.log('$el',$el);

    $el.find('.js-accordion-link').on('click',function(e){
      e.preventDefault();
      $el.toggleClass('is-open');
console.log('clicked');
    })
  });

}(window,document,jQuery);