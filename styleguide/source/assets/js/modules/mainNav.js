export default function (window,document,$,undefined) {

  $('.js-main-nav').each(function() {
    let openClass = "is-open",
        closeClass = "is-closed",
        $parent = $(this);

    $parent.find('.js-main-nav-toggle').on('click mouseenter', function(e) {
      e.preventdefault;

      let $link = $(this),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass);

      // hide other content
      hide($openContent);
      
      if(open) { 
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      let $content = $link.find('.js-main-nav-content');

      $content
        .stop( true, true )
        .delay( 200 )
        .slideUp(0,function() {
          $content
            .removeClass(closeClass)
            .addClass(openClass)
            .slideDown('fast');
        });
    });

    $parent.find('.js-main-nav-toggle').on('mouseleave', function(e) {
      let $openContent = $(this).find('.js-main-nav-content');
      hide($openContent);
    });

    function hide($content) {
      $parent.find("." + openClass).removeClass(openClass);
      
      $content
        .stop( true, true )
        .slideUp('fast',function() {
          $content
            .addClass(closeClass)
            .removeClass(openClass)
            .slideDown(0);
        });
    }

  });

}(window,document,jQuery);
