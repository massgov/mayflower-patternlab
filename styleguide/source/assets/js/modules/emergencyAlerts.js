import cookie   from "../helpers/cookies.js";

export default function (window,document,$,undefined) {
  // Emergency Alerts start close on page load
  // the default behavior is to expand the alerts
  // Emergency Alerts should stay closed if the cookie is set to false

  $('.js-emergency-alerts').each(function(){
    let $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = cookie.getCookie(cookieName),
        $button = $el.find('.js-accordion-link button'),
        $link = $el.find('.js-accordion-link');

    // if the user has closed the alerts on a previous page
    if(typeof(cookieValue) !== 'undefined' && cookieValue === 'false') {
      open = false;
      // set the state of aria-expanded
      $button.attr('aria-expanded', open);
    }

    // Emergency Alerts loads closed so expand it.
    if(open) {
      open = false; // clicking the link swaps the value
      $link.first().trigger('click');
    }

    $link.on('click', function() {
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      cookie.setCookie(cookieName,open);
      // change the state of aria-expanded
      $button.attr('aria-expanded', open);
    });
  });
}(window,document,jQuery);
