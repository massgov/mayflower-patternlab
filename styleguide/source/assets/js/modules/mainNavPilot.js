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
        previousKey = null,
        breakpoint = 800; // matches CSS breakpoint for Main Nav

    // duplicated from mainNav.js
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

    // make root top-level links inert for pilot
    $parent.find('.has-subnav .js-main-nav-top-link').click(function(e) {
      e.preventDefault();
    });

    // Ensure top-level links that are potential anchor links close the sidebar on mobile
    $parent.find('.ma__main-nav__item:not(.has-subnav) .js-main-nav-top-link').click(function() {
      $('body').removeClass('show-menu');
    });

    // Hide any open submenu content when the sidebar menu is closed
    $('.js-header-menu-button').click(function() {
      let $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });



  });

}(window,document,jQuery);

