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
    // Determine if this emergency alerts pattern is in the context of a dynamic ajax alert organism.
    let $parent = $(this).parent('.js-ajax-alerts'),
        waitForParent = false;

    // If it is in the context of ajax-alerts, wait for that js to execute before initializing.
    if ($parent.length) {
      waitForParent = true;
      // Get the alert id so we can use it to set the cookie name.
      $parent.on('ma:AjaxAlerts:DataIdAdded', function(e,data){
        init.apply(this, [data.id]);
      });
    }

    // If it isn't in the context of ajax-alerts, assume alert id passed in on page load, initialize.
    if (!waitForParent) {
      init.apply(this);
    }

  });

  /**
   * Initialize the emergency alert.
   *
   * @param myId
   *  Optional parameter, passed in when loading in the context of ajax-alerts organism.
   */
  function init(myId) {
    let open = true,
        id = myId ? myId : $(this).data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = cookie.getCookie(cookieName),
        $button = $(this).find('.js-accordion-link');

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

    // Emergency Alerts loads closed so expand it.
    if(open) {
      open = false; // clicking the link swaps the value
      $button.first().trigger('click');
    }
  }
}(window,document,jQuery);
