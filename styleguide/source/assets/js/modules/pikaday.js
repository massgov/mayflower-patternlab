export default function (window,document,$,undefined) {
  
  $('.js-input-date').each(function(){
    let $el = $(this);
    let picker = new Pikaday({ field: this });

    $el.attr('type','text');
  });

}(window,document,jQuery);
