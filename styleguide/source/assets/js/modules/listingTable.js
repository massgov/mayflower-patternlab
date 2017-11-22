export default function (window,document,$,undefined) {
  "use strict";
  $('.js-listing-table-data-container').each(function() {

    let $el = $(this),
        $showHideButton = $('.js-listing-table-button', $el);

    $showHideButton.on('click', function(e) {
      e.preventDefault();
      $el.toggleClass('is-open');

      if ($el.hasClass('is-open')) {
        $showHideButton.attr('aria-expanded', 'true');
      }
      else {
        $showHideButton.attr('aria-expanded', 'false');
      }
    });

  });
}(window,document,jQuery);
