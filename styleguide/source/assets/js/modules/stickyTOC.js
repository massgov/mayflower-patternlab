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
    var $tocLink = '<div class="ma__sticky-toc__link"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg><a href="#'+sectionId+'" >'+sectionTitle+'</a></div>'

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

    $button.text($buttonText === "show more" ? "show more" : "show less");
  });

  $(window).resize(function () {
    $('.ma__sticky-toc__link').removeAttr('style');
    $tocContent.removeClass('open');
  }).resize();
}
(window,document,jQuery);
