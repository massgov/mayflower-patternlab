export default function (window,document,$,undefined) {

  $('.js-banner-carousel').each(function(){
    let $el = $(this);

    if($el.children().length <= 1) {
      return;
    }

    let slider = $el.slick({
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  });

}(window,document,jQuery);