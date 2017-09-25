export default function (window,document,$,undefined) {
  "use strict";
  $('.js-header-tag-link').each(function() {

    let $showHideButton = $('.js-header-tag-link .js-header-tag-button'),
        $relatedItems = $('.js-header-tag-link a:nth-child(n+4)');

      $showHideButton.hide();

      // Hide items after 3 items.
      if ($relatedItems.length) {
        // Hide items if more than three.
        $relatedItems.hide();
        // Show our see button if we have more than three items.
        $showHideButton.show();
      }

      $showHideButton.on('click', function(e) {
        e.preventDefault();
        $showHideButton.toggleClass('is-open');

        if ($showHideButton.hasClass('is-open')) {
          $showHideButton.attr('aria-expanded', 'true');
          $relatedItems.show();
        }
        else {
          $showHideButton.attr('aria-expanded', 'false');
          $relatedItems.hide();
        }
      });

  });
}(window,document,jQuery);
