export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    // Allow heading and contents to be indented.
    if ($el.parents('.js-outline-indent').length) {
      $el.find(':header').each(function(index,header){
        $(header).nextUntil(':header')
          .addClass("ma__rich-text__indent")
          .attr('data-ma-heading-parent', $(header).prop('tagName'));
      });
    }
  });
}
(window,document,jQuery);