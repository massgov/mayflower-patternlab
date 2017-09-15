export default function (window,document,$,undefined) {

  var showHideButton = $('.ma__header-tags__terms .js-accordion-link');
  var relatedItems = $('.ma__header-tags__terms a');
  var moreThanThreeRelatedItems = relatedItems.length > 2 ? true : false;

  if (!moreThanThreeRelatedItems) {
    showHideButton.hide();
  }

  // If we have related items, inspect them.
  if (moreThanThreeRelatedItems) {
    var showThreeRelatedItems = function() {
      for (var i = 3; i < relatedItems.length; i++) {
        $(relatedItems[i]).hide();
      }
    };

    var showAllRelatedItems = function() {
      for (var i = 0; i < relatedItems.length; i++) {
        $(relatedItems[i]).show();
      }
    };

    // Init just show 3.
    showThreeRelatedItems();

    showHideButton.on('click', function(e) {
      "use strict";
      e.preventDefault();
      showHideButton.toggleClass('is-open');

      if (showHideButton.hasClass('is-open')) {
        showAllRelatedItems();
        showHideButton.attr('aria-expanded', 'true');
      }
      else {
        showThreeRelatedItems();
        showHideButton.attr('aria-expanded', 'false');
      }
    });
  }

}(window,document,jQuery);
