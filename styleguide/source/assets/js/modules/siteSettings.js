import cookies from "../helpers/cookies.js";

export default function (window,document,$,undefined) {

  $('.js-site-setting-form').each(function(){
    let $parent = $(this),
        $reset = $parent.find('.js-button-reset'),
        $themeSelect = $parent.find('.js-site-settings-theme select'),
        $langSelect = $parent.find('.js-site-settings-lang select'),
        $zoomControls = $parent.find('.js-zoom-controls'),
        defaultZoomVal = $zoomControls.find('input[type="radio"]:checked').val(),
        cookieName = "site-settings",
        cookieExpires = 365,
        cookieValue = JSON.parse(cookies.getCookie(cookieName) || "{}");

    // set default values to match cookie values
    if(typeof(cookieValue.zoom) !== "undefined") {
      $zoomControls.find('input[value="' + cookieValue.zoom + '"]').prop('checked', true);
      $zoomControls.trigger('reset');
    }

    if(typeof(cookieValue.theme) !== "undefined") {
      $themeSelect.val(cookieValue.theme).trigger('change');
      $('body').attr('data-theme',cookieValue.theme);
    }

    if(typeof(cookieValue.lang) !== "undefined") {
      $langSelect.val(cookieValue.lang).trigger('change');
      $('html').attr('lang',cookieValue.lang);
    }

    $zoomControls.find('input[type="radio"]').on('change',function(){
      cookieValue.zoom = $(this).val();
      updateCookie();
    });

    $themeSelect.on('change', function(){
      cookieValue.theme = $(this).val();
      updateCookie();
      $('body').attr('data-theme',cookieValue.theme);
    });

    $langSelect.on('change', function(){
      cookieValue.lang = $(this).val();
      updateCookie();
      $('html').attr('lang',cookieValue.lang);
    });

    $reset.on("click",function(e){
      cookieValue.zoom = defaultZoomVal;
      updateCookie();
      // trigger a reset of the custom form input JS
      setTimeout(function(){
        $zoomControls.trigger('reset');
        $parent.find('select').trigger('change');
      },.1);
    });

    function updateCookie() {
      cookies.setCookie(cookieName,JSON.stringify(cookieValue),cookieExpires);
    }

  });

}(window,document,jQuery);