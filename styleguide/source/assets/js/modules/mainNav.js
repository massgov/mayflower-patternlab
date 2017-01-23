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
        $mainNavToggle = $parent.find('.js-main-nav-toggle'),
        $mainNavItems = $parent.find('.js-main-nav-toggle, .js-main-nav-top-link'),
        previousKey = null,
        breakpoint = 800; // matches CSS breakpoint for Main Nav

    $mainNavItems.on('keydown', function(e) {
      if(windowWidth <= breakpoint) {
        // only for desktop
        return;
      }

      // Grab all the DOM info we need...
      let $link = $(this),
          $topLevelLinks = $parent.find('.ma__main-nav__top-link'),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass),
          $focusedElement = $(document.activeElement),
      // relevant if open..
          $topLevelItem = $focusedElement.parents('.ma__main-nav__item'),
          $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'),
          $dropdownLinks = $link.find('.ma__main-nav__subitem .ma__main-nav__link'),
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);


      // down arrow key
      if(e.keyCode === 40) {
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select next menu item
        e.preventDefault();
        if(open) {
          if(focusIndexInDropdown === ($dropdownLinks.length-1) ) {
            return;
          } else {
            if(focusIndexInDropdown === -1) {
              $dropdownLinks[1].focus();
            } else {
              $dropdownLinks[focusIndexInDropdown+1].focus();
            }
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $link.addClass(openClass);
          if($dropdownLinks[1]) {
            $dropdownLinks[1].focus();
          }
          return;
        }
      }

       if(e.keyCode === 38) {  // up arrow
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select previous menu item
        e.preventDefault();
        if(open) {
          if(focusIndexInDropdown <= 1 ) { // not 0 bc of hidden first link
            hide($openContent);
            $topLevelLink.focus();
            return;
          } else {
            $dropdownLinks[focusIndexInDropdown-1].focus();
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $link.addClass(openClass);
          return;
        }
      }

      // esc key
      if(e.keyCode === 27) {
        // Close menu and return focus to menubar
        e.preventDefault();
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.focus();
        return;
      }

      // left arrow key
      if(e.keyCode === 37) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Previous menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        let index = $topLevelLinks.index($topLevelLink)-1;
        if($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;

      }
      // right arrow key
      if(e.keyCode === 39) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Next menubar item
        //
        // If dropdown focus
        //  - Open next pull menu and select first item
        hide($openContent);
        let index = $topLevelLinks.index($topLevelLink)+1;
        if($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;
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
    $mainNavItems.on('mouseenter', function(e) {
      if(windowWidth > breakpoint) {
        let $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function(e) {
      if(windowWidth > breakpoint) {
        let $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });
    $mainNavToggle.children('a').on('click', function(e) {
      if(windowWidth <= breakpoint) {
        let $content = $(this).parent().find('.js-main-nav-content');
        // add open class to this item
        $(this).parent().addClass(openClass);
        show($content);
      }
    });
    $mainNavToggle.last()
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

    // Hide any open submenu content when the sidebar menu is closed
    $('.js-header-menu-button').click(function() {
      let $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });


    function hide($content) {
      $('body').removeClass(submenuClass);
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
      $('body').addClass(submenuClass);
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
