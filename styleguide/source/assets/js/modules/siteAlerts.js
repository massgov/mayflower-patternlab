import cookie   from "../helpers/cookies.js";

export default function (window,document,$,undefined) {
  // Site Alerts start close on page load
  // the default behavior is to expand the alerts
  // Site Alerts should stay closed if the cookie is set to false
  
  /* ********* NOTE: 
    This component is dependent on the 
    accordion.js component runing before it. 
  ********* */

  $('.js-site-alerts').each(function(){
    let $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'site-alerts' + id,
        cookieValue = cookie.getCookie(cookieName),
        $button = $el.find('.js-accordion-link');

    $button.on('click', function() {
      // clicking this link also triggers the accordion click
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      cookie.setCookie(cookieName,open);
    });

    // if the user has closed the alerts on a previous page
    if(typeof(cookieValue) !== 'undefined' && cookieValue === 'false') {
      open = false;
      // set the state of aria-expanded
      $button.attr('aria-expanded', open);
    }

    // Site Alerts loads closed so expand it.
    if(open) {
      open = false; // clicking the link swaps the value
      $button.first().trigger('click');
    }

  });
}(window,document,jQuery);
