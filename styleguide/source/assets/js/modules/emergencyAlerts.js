import cookie   from "../helpers/cookies.js";

export default function (window,document,$,undefined) {

  $('.js-emergency-alerts').each(function(){
    let $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = cookie.getCookie(cookieName);

    if(typeof(cookieValue) != 'undefined' && cookieValue === 'false') {
      // cookieValue is a string so we can't use the value directly
      open = false;
    }
    if(open) {
      // expand the menu
      $el.find('.js-accordion-link').trigger('click');
    }

    $el.on('click','.js-accordion-link',function(){
      // toggle the current state
      open = !open;
      // update open/close state cookie 
      // leave off third argument to make it expire on session
      cookie.setCookie(cookieName,open);
    });

  });

}(window,document,jQuery);