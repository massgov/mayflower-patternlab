export default function (window,document,$,undefined) {

  var $toc = $('.ma__sticky-toc');
  var $tocContent = $('.ma__sticky-toc__links');
  var $tocSections = $('.ma__information-details__content').find('h2');
  var tocSectionCount = $tocSections.length;

  if (tocSectionCount < 3) {
    $toc.remove();
  }

  if (tocSectionCount <= 10) {
    if ($(window).width() > 558 ) {
      $('.ma__sticky-toc__footer').toggle();
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
    var $button = $(this).find('button');
    var $buttonText = $button.text();

    $tocContent.toggleClass('open');
    $button.toggleClass('open');

    $button.text($buttonText == "show more" ? "show more" : "show less");
  });

  $(window).resize(function () {
    $('.ma__sticky-toc__link').removeAttr('style');
    $tocContent.removeClass('open');
  }).resize();
}
(window,document,jQuery);
