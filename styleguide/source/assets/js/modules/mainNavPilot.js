export default function (window,document,$,undefined) {

  $('.js-main-nav').each(function() {
    let $parent = $(this),
      $mainNavToggle = $parent.find('.js-main-nav-toggle');

    // make root top-level links inert for pilot
    $mainNavToggle.children('a').on('click', function(e) {
      e.preventDefault();
    });

    // Ensure top-level links that are potential anchor links close the sidebar on mobile
    $parent.find('.js-main-nav-top-link').find('a').on('click', function() {
      $('.js-header-menu-button').trigger('click');
    });

  });

}(window,document,jQuery);

