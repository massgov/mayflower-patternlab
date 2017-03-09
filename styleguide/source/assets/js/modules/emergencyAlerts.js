import cookie   from "../helpers/cookies.js";

export default function (window,document,$,undefined) {
  $('.js-emergency-alerts').each(function(){
    let $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = cookie.getCookie(cookieName),
        $button = $el.find('.js-accordion-link button'),
        // Add an aria-expanded attribute with its default value, false. to the <button>
        $buttonState = $button.attr('aria-expanded', !open);

    if(typeof(cookieValue) != 'undefined' && cookieValue === 'false') {
      // cookieValue is a string so we can't use the value directly
      open = false;

      $button.attr('aria-expanded', open);
    }
    if(open) {
      // expand the menu
      $el.find('.js-accordion-link').trigger('click');

      $button.trigger('click');
    }

    $button.on('click', function(e) {
      e.preventDefault();
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      cookie.setCookie(cookieName,open);
      // change the state of aria-expanded
      $buttonState = $buttonState === open ? !open : open;
      $(this).attr('aria-expanded', $buttonState);
    });

  });

}(window,document,jQuery);
