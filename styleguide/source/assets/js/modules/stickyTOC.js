export default function (window,document,$,undefined) {





























  $('.ma__sticky-toc__toggle-link').on('click', function() {
    $toc.toggleClass('is-open');
  });

  $('.ma__sticky-toc__footer').on('click', function() {
    // show the hidden links
    $('.ma__sticky-toc__link:gt(10)').toggle();
    // hide the button
    $(this).toggle();
  });

  $(window).resize(function () {
    $('.ma__sticky-toc__link, .ma__sticky-toc__footer').removeAttr('style');
  }).resize();
}
(window,document,jQuery);
