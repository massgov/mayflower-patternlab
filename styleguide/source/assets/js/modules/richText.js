export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );
  });
}(window,document,jQuery);
