export default function (window,document,$,undefined) {
  "use strict";
  $('.js-header-tag-link').each(function(index) {

    let $showHideButton = $('.js-header-tag-link .js-header-tag-button'),
        $dynamicItems = $('.js-header-tag-link a:nth-child(n+4)'),
        $parent = $showHideButton.parent(),
        id = $parent.attr('id') || 'headerTags' + (index + 1),
        open = $parent.hasClass('is-open');

      // Set the id attribute (respects default if set).
      $parent.attr('id', id);

      if ($dynamicItems.length) {
        // Show our see button if we have more than three items.
        $showHideButton.attr('aria-expanded',open).attr('aria-controls', id);
        $showHideButton.show();
      }

      $showHideButton.on('click', function(e) {
        e.preventDefault();
        $parent.toggleClass('is-open');

        if ($parent.hasClass('is-open')) {
          $showHideButton.attr('aria-expanded', 'true');
          $dynamicItems.show();
        }
        else {
          $showHideButton.attr('aria-expanded', 'false');
          $dynamicItems.hide();
        }
      });

  });
}(window,document,jQuery);
