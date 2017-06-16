export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    $el.find('.js-rich-text-footnote').each(function() {
      let $link = $(this),
          target = $link.attr('href');
      
      $link.on('click',function(e) {
        e.preventDefault();

        let position = $(target).offset();
        
        $("html,body").stop(true,true).animate({scrollTop:position.top}, '750', function(){
          $(target).focus();
        });
      });
    });
  });
}(window,document,jQuery);
