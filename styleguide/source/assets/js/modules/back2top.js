export default function (window,document,$,undefined) {

  $(".js-back2top").each(function() {
    let $el = $(this);

    if($('body').height() >= 2000) {
      $el.fadeIn();
    }

    $el.on('click',function() {
      $("html, body").stop(true,true).animate({scrollTop:0}, '750');
    });

  });

}(window,document,jQuery);
