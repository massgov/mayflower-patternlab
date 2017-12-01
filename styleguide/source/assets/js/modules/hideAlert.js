import cookies from "../helpers/cookies.js";

export default function (window,document,$,undefined) {

  $('.js-header-alert').each(function(){
    let $el = $(this),
        $link = $el.find('.js-header-alert-link'),
        id = $el.data('id'),
        cookieName = "Alert" + id,
        cookieExpires = 365,
        cookieValue = cookies.getCookie(cookieName);

    // show alert if cookie doesn't exist
    if(cookieValue !== "hide") {
      $el.fadeIn().fadeOut('fast').fadeIn('slow');
    }

    // hide the alert
    $link.on('click',function(){
      cookies.setCookie(cookieName,"hide",cookieExpires);
      $el.stop(true,true).fadeOut();
    })
  });
}(window,document,jQuery);

