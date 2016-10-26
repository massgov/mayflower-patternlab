export default function (window,document,$,undefined) {
  $('.js-breadcrumbs-button').each(function(){
    let $el = $(this);
    // if the this is clicked
    $el.on('click',function(e){
      e.preventDefault();
      $el.toggleClass('is-open');
    });

    $('body').on('click',function(e){
      if(!$(e.target).hasClass('js-breadcrumbs-button')) {
        $el.removeClass('is-open');
      }
    });

  });
}(window,document,jQuery);