import cookie   from "../helpers/cookies.js";

export default function (window,document,$,undefined) {
  // Emergency Alerts start close on page load
  // the default behavior is to expand the alerts
  // Emergency Alerts should stay closed if the cookie is set to false
  
  /* ********* NOTE: 
    This component is dependent on the 
    accordion.js component runing before it. 
  ********* */

  $('.js-emergency-alerts').each(function(){
    let $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = cookie.getCookie(cookieName),
        $button = $el.find('.js-accordion-link button');

    $button.on('click', function() {
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      cookie.setCookie(cookieName,open);
      // change the state of aria-expanded
      $button.attr('aria-expanded', open);
    });

    // if the user has closed the alerts on a previous page
    if(typeof(cookieValue) !== 'undefined' && cookieValue === 'false') {
      open = false;
      // set the state of aria-expanded
      $button.attr('aria-expanded', open);
    }

    // Emergency Alerts loads closed so expand it.
    if(open) {
      open = false; // clicking the link swaps the value
      $button.first().trigger('click');
    }

  });
}(window,document,jQuery);
