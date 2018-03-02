import throttle from "../helpers/throttle.js";

export default function (window,document,$,undefined) {
  let containerClass = '.js-inline-overlay';
  let contentClass = '.js-inline-overlay-content';
  let toggleClass = '.js-inline-overlay-toggle';

  function toggleOverlay() {
    let $toggleEl = $(this);
    let $containerEl = $toggleEl.parents(containerClass);
    let $contentEl = $toggleEl.parents(containerClass).find(contentClass);
    let isOpen = $containerEl.hasClass('is-open');
    $('body').toggleClass('scroll-disabled', !isOpen);
    // if on mobile & we're closing the overlay, scroll title back into view
    if (document.documentElement.clientWidth < 840 && isOpen) {
      $containerEl.toggleClass('is-open', !isOpen);
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $containerEl.offset().top - 80
          });
      }, 250);

    } else {
      $('html, body').animate({
        scrollTop: $containerEl.offset().top
      }, 250, function() {
        $containerEl.toggleClass('is-open', !isOpen);
      });
    }

    // Add random ID if no ID present.
    let contentID = $contentEl.attr('id');
    if(!contentID) {
       $containerEl.attr('id', `overlay-${Math.floor(Math.random()*100000)}`);
    }
    // update aria
    $toggleEl.attr('aria-expanded',!isOpen).attr('aria-controls', contentID);
  }

  $(document).on('click', toggleClass, toggleOverlay);

}(window,document,jQuery);
