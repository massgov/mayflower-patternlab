export default function (window,document,$,undefined) {

  // const $pageContent = $('#main-content .ma__information-details__content');
  // const tocSections = $pageContent.find('h2').length;

  const $toc = $('.ma__sticky-toc__links');
  const tocSections = $('.ma__sticky-toc__link').length;

  if (tocSections > 3) {
    // insert Table of Content
  }

  if (tocSections > 10) {

  }

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
