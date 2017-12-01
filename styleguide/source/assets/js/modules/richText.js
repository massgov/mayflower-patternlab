export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    if ($el.parents('.js-outline-indent').length) {
      let indent = {
        'H2': 20,
        'H3': 40,
        'H4': 60,
        'H5': 80,
        'H6': 100,
      };
      $el.find(':header').each(function(index,header){
        $(header).nextUntil(':header').addClass("ma__rich-text__indent" + indent[$(header).prop('tagName')]);
      });
    }
  });
}(window,document,jQuery);