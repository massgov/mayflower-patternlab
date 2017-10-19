export default function (window,document,$,undefined) {
  "use strict";
  $('.js-header-tag-link').each(function() {

    let $showHideButton = $('.js-header-tag-link .js-header-tag-button'),
        $relatedItems = $('.js-header-tag-link a:nth-child(n+4)'),
        $parent = $showHideButton.parent();

      // Hide items after 3 items.
      if ($relatedItems.length) {
        // Show our see button if we have more than three items.
        $showHideButton.show();
      }

      $showHideButton.on('click', function(e) {
        e.preventDefault();
        $parent.toggleClass('is-open');

        if ($parent.hasClass('is-open')) {
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
