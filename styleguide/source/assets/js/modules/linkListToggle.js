export default function (window,document,$,undefined) {

  $('.ma__link-list--image-blocks, .ma__link-list--image-links').each(function() {

    const $thisList = $(this).find('.ma__link-list__items'),
    $thisToggle = $(this).find('.ma__link-list__toggle'),
    $thisToggleLabel = $thisToggle.find('span'),
    $listItem = $thisList.children(),
    listItems = $listItem.length;

    let width = $(window).width();

    if ((listItems > 3) && (width < 1201)) {
      // Show More button only when there are enough to toggle.
      $thisToggle.addClass('show-toggle');
    }

    $thisToggle.on('click', function() {
      let thisToggleText = $thisToggleLabel.text();

      $thisToggle.toggleClass('toggle-open');
      $thisToggleLabel.text(thisToggleText === "less" ? "more" : "less");

      // Because the heights are dynamic a css transition would be buggy.
      // Toggle all after first 3 on mobile.
      if (width < 780) {
        $listItem.eq(3).nextAll().slideToggle().toggleClass('toggle-open');
      }
      // Toggle all after first 6 on tablet.
      else {
        $listItem.eq(6).nextAll().slideToggle().toggleClass('toggle-open');
      }
    });

    $(window).resize(function () {
      // Remove added attributes at desktop width.
      if (width < 1201) {
        $thisToggle.removeAttr('style');
        $listItem.removeAttr('style');
      }
    });
  });

}(window,document,jQuery);