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
          dropdownLinksLength = $dropdownLinks.length,
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);

      // tab key
      if(e.keyCode === 9) {
        // Close any currently-open menu
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.attr('aria-expanded','false');
        return;
      }

      // up/down arrows
      if(e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault();
        // If menubar focus
        //  - Open pull down menu and select appropriate menu item
        //
        // If dropdown focus
        //  - Change selected menu item
        if(!open) {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.attr('aria-expanded', 'true');
          $link.addClass(openClass);
        }
        // Up arrow was used
        if(e.keyCode === 38) {
          if(focusIndexInDropdown <= 1 ) {
            focusIndexInDropdown = dropdownLinksLength;
          }
          $dropdownLinks[focusIndexInDropdown-1].focus();
        } else {
          // If focused element isn't in dropdown, start with the 0th item instead.
          focusIndexInDropdown = Math.max(0, focusIndexInDropdown);
          // Focus should wrap around at end of list. Skip 0th item.
          focusIndexInDropdown = Math.max(1, (focusIndexInDropdown + 1) % dropdownLinksLength);
          $dropdownLinks[focusIndexInDropdown].focus();
        }
        return;
      }

      // esc key
      if(e.keyCode === 27) {
        // Close menu and return focus to menubar
        e.preventDefault();
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.focus().attr('aria-expanded','false');
        return;
      }

      // left or right arrow keys
      if(e.keyCode === 37 || e.keyCode === 39) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Change menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        $topLevelLink.attr('aria-expanded','false');
        let leftArrow = e.keyCode === 37,
            index = $topLevelLinks.index($topLevelLink),
            linkCount = $topLevelLinks.length;
        // Get previous item if left arrow, next item if right arrow.
        index += (leftArrow ? -1 : 1);
        // Wrap around if at the end of the set of menus.
        index = ((index % linkCount) + linkCount) % linkCount;
        $topLevelLinks[index].focus();
        return;
      }

      if(open || (typeof(e.keycode) !== "undefined")) {
        return;
      }

    });
    $mainNavItems.on('mouseenter', function(e) {
      $(this).children('button').attr("aria-expanded","true");

      if(windowWidth > breakpoint) {
        let $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function(e) {
      $(this).children('button').attr("aria-expanded","false");

      if(windowWidth > breakpoint) {
        let $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });
    $mainNavToggle.children('button, a').on('click', function(e) {
      let $el = $(this);
      let $elParent = $(this).parent();
      let $content = $elParent.find('.js-main-nav-content');
      let $openContent = $parent.find('.js-main-nav-content.' + openClass);
      let isOpen = $content.hasClass(openClass);

      // mobile
      if(windowWidth <= breakpoint) {
        e.preventDefault();
        // add open class to this item
        $elParent.addClass(openClass);
        show($content);
        $el.attr('aria-expanded', 'true');
      } else {
        hide($openContent);
        $el.attr('aria-expanded', 'false');

        if(!isOpen) {
          show($content);
          $el.attr('aria-expanded', 'true');
        }
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
