export default function (window,document,$,undefined) {

  $('.pre-content .ma__sticky-toc').each(function() {
    const $toc = $('.ma__sticky-toc'),
          $tocContent = $('.ma__sticky-toc__links'),
          $tocSections = $('.main-content .page-content').find('section h2'),
          tocSectionCount = $tocSections.length,
          $tocColumn = $('.ma__sticky-toc__column'),
          $mobileToggle = $('.ma__sticky-toc__toggle-link'),
          $tocToggle = $('.stickyTOC-open'),
          $tocFooter = $('.ma__sticky-toc__footer');

    // // Remove wrapper if not enough links.
    if (tocSectionCount < 3 ) {
      $toc.remove();
    }
    // Show expander when more than 10 links.
    if (tocSectionCount <= 10) {
      if ($(window).width() > 480 ) {
        $('.ma__sticky-toc__footer').toggle();
      }
    }

    // Use headers to fill TOC.
    $tocSections.each(function() {
      let $section = $(this);
      let sectionId = $section.attr('id');
      let sectionTitle = $section.text();
      let $tocLink = '<div class="ma__sticky-toc__link"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg><a href="#'+sectionId+'" >'+sectionTitle+'</a></div>';

      $section.addClass('sticky-toc-jump-target');

      $('.ma__sticky-toc__column').append($tocLink);
    });

    // Toggle mobile TOC open.
    $mobileToggle.on('click', function() {
      $tocContent.toggleClass('is-open');
    });

    $tocFooter.on('click', function() {
      let $button = $(this).find('button');
      let $buttonText = $button.text();

      // Toggle hidden links open.
      $tocContent.toggleClass('open');
      $button.toggleClass('open');

      // Toggle button text.
      $button.text($buttonText === "show less" ? "show more" : "show less");
    });

    $(window).resize(function () {
      // Reset menu for each form factor on resize.
      $('.ma__sticky-toc__link').removeAttr('style');
      $tocContent.removeClass('open');
    });

    $(window).scroll(function () {
      var windowTop = $(window).scrollTop();
      var stickyNavActive  = $toc.offset().top + $toc.outerHeight();

      // Active Sticky TOC when on page TOC scrolls past.
      if (stickyNavActive > windowTop) {
        $toc.removeClass('stuck');
      } else {
        $toc.addClass('stuck');
      }

      $tocSections.each(function() {
        let $thisSectionTitle = $(this).text();
        // Height of title bar + section padding: 70 + 45 = 115
        let sectionPosition = $(this).offset().top - 115;

        // Switch title in sticky TOC on scroll.
        if (sectionPosition < windowTop) {
          $('.ma__sticky-toc__current-section').text($thisSectionTitle);
        }
      });
    });

    // Back to top button
    $(".stickyTOC-top").on('click',function(e) {
      e.preventDefault();
      try {
        $("html, body").stop(true,true).animate({scrollTop:0}, '750');
      }
      catch(e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    function menuToggle() {
      $('.ma__sticky-toc__stuck-menu').toggleClass('sticky-nav-open');
      $('body').toggleClass('stuck');
    }

    $tocToggle.on('click', function() {
      if ($('#main-content').not(':has(.ma__sticky-toc__stuck-menu)')) {
        $tocColumn.clone(true).addClass('ma__sticky-toc__stuck-menu').appendTo('#main-content');
      }
      menuToggle();
    });

    $('.secondary-label-close').on('click', function() {
      menuToggle();
    });

    $('body').on('click', '.ma__sticky-toc__stuck-menu a', function() {
      menuToggle();
    });
  });
}
(window,document,jQuery);
