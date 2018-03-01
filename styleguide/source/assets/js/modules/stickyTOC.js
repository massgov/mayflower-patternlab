export default function (window,document,$,undefined) {

  var $toc = $('.ma__sticky-toc');
  var $tocContent = $('.ma__sticky-toc__links');
  var $tocSections = $('.ma__information-details__content').find('h2');
  var tocSectionCount = $tocSections.length;

  if (tocSectionCount > 3) {
    $toc.show();
  }

  if (tocSectionCount > 10) {
    if ($(window).width() > 558 ) {
      $('.ma__sticky-toc__footer').show();
    }
  }

  $tocSections.each(function() {
    var $section = $(this);
    var sectionId = $section.attr('id');
    var sectionTitle = $section.text();
    var $tocLink = '<div class="ma__sticky-toc__link"><a href="#'+sectionId+'" >'+sectionTitle+'</a></div>'

    $('.ma__sticky-toc__column').append($tocLink);
  });

  $('.ma__sticky-toc__toggle-link').on('click', function() {
    $tocContent.toggleClass('is-open');
  });

  $('.ma__sticky-toc__footer').on('click', function() {
    // show the hidden links
    $('.ma__sticky-toc__link:gt(10)').toggle();
    // hide the button
    $(this).toggle();
  });

  $(window).resize(function () {
    $('.ma__sticky-toc__link').removeAttr('style');
  }).resize();
}
(window,document,jQuery);
