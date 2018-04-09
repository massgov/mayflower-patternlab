export default function (window,document,$,undefined) {

  $('.ma__link-list--image-blocks, .ma__link-list--image-links').each(function() {

    const $thisList = $(this).find('.ma__link-list__items'),
    $thisToggle = $(this).find('.ma__link-list__toggle'),
    $listItem = $thisList.children(),
    listItems = $listItem.length;
    let width = $(window).width();

    if ((listItems > 3) && (width < 1201)) {
      // Show More button only when there are enough to toggle.
      $thisToggle.toggle();
    }

    $thisToggle.on('click', function() {
      // Toggle all after first 3 on mobile.
      if (width < 780) {
        $listItem.eq(3).nextAll().slideToggle();
      }
      // Toggle all after first 6 on tablet.
      else {
        $listItem.eq(6).nextAll().slideToggle();
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