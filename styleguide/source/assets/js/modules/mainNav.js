export default function (window,document,$,undefined) {

  $('.js-main-nav').each(function() {
    let openClass = "is-open",
        closeClass = "is-closed",
        $parent = $(this),
        previousKey = null;

    $parent.find('.js-main-nav-toggle').on('keydown mouseenter', function(e) {


      let $link = $(this),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass);

      if(e.keyCode === 38 && open) {  // up arrow
        // hide content
        hide($openContent);
      }

      // key code 9 is the tab key
      if(open || (typeof(e.keycode) !== "undefined" && e.keycode !== 9)) { 
        return;
      }

      // hide content
      hide($openContent);
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      let $content = $link.find('.js-main-nav-content');

      $content
        .stop( true, true )
        .delay( 200 )
        .slideUp(0,function() {
          $content
            .addClass(openClass)
            .removeClass(closeClass)
            .slideDown('fast');
        });
    });

    $parent.find('.js-main-nav-toggle').on('mouseleave', function(e) {
      let $openContent = $(this).find('.js-main-nav-content');
      hide($openContent);
    });

    $parent
      .find('.js-main-nav-toggle')
      .last()
        .find('.js-main-nav-content li')
        .last()
          .find('a').on('keydown', function(e) {
            e.stopPropagation();
            // previous key was not a shift
            if(e.keyCode === 9 && previousKey !== 16) {  // tab arrow\
              let $openContent = $parent.find('.js-main-nav-content.' + openClass);
              hide($openContent);
            }
            previousKey = e.keyCode;
    });

    function hide($content) {
      $parent.find("." + openClass).removeClass(openClass);
      
      $content
        .stop( true, true )
        .slideUp('fast',function() {
          $content
            .addClass(closeClass)
            .slideDown(0);
        });
    }

  });

}(window,document,jQuery);
