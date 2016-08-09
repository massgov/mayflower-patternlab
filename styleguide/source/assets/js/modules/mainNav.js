export default function (window,document,$,undefined) {

  let windowWidth = window.innerWidth;

  $(window).resize(function(){
    windowWidth = window.innerWidth;
  });

  $('.js-main-nav').each(function() {
    let openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-submenu",
        $parent = $(this),
        previousKey = null,
        breakpoint = 780;

    $parent.find('.js-main-nav-toggle').on('keydown mouseenter', function(e) {
      if(windowWidth <= breakpoint) {
        return;
      }

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
      show($link.find('.js-main-nav-content'));
    });

    $parent.find('.js-main-nav-toggle').on('mouseleave', function(e) {
      if(windowWidth > breakpoint) {
        let $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });

    $parent.find('.js-main-nav-toggle').on('click', function(e) {
      if(windowWidth <= breakpoint) {
        e.preventDefault;

        let $content = $(this).find('.js-main-nav-content');
        // add open class to this item
        $(this).addClass(openClass);
        show($content);  
      }      
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

    $('.js-close-sub-nav').on('click', function(){
      let $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });


    function hide($content) {
      $('body').removeClass(submenuClass)
      $parent.find("." + openClass).removeClass(openClass);
      
      if(windowWidth <= breakpoint) {
        $content.addClass(closeClass);
      } else {
        $content
        .stop( true, true )
        .slideUp('fast',function() {
          $content
            .addClass(closeClass)
            .slideDown(0);
        });
      }
    }

    function show($content) {
      $('body').addClass(submenuClass)
      if(windowWidth <= breakpoint) {
        $content
          .addClass(openClass)
          .removeClass(closeClass);
      } else {
        $content
          .stop( true, true )
          .delay( 200 )
          .slideUp(0,function() {
            $content
              .addClass(openClass)
              .removeClass(closeClass)
              .slideDown('fast');
          });
      }
    }

  });

}(window,document,jQuery);
