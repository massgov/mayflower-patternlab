export default function (window,document,$,undefined) {

  $('.js-footnote').each(function(){
    let $el = $(this),
        $link = $el.find(".js-footnote-link"),
        $messageLink = $link.clone(),
        target = $link.attr('href');

    $messageLink.text('');

    $el.find(".js-footnote-message p:last-child").append($messageLink);

    $el.on('click','.js-footnote-link', function(e) {
      e.preventDefault();

      let position = $(target).offset();
      
      $("html,body").stop(true,true).animate({scrollTop:position.top}, '750', function(){
        $(target).focus();
      });
    });
  });
}(window,document,jQuery);
