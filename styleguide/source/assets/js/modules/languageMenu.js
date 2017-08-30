export default function (window,document,$,undefined) {

  if($('.js-language-menu').length) {

    let script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=languageMenuInit";
    script.async = true;
    
    let element = document.getElementsByTagName('head')[0];
    element.appendChild(script);    
  }

  window.languageMenuInit = function() {
    const $el = $('.js-language-menu').first();
    const id = "language-menu-0";
    const languages = $el.data('languages');

    $el.attr('id',id);

    new google.translate.TranslateElement({
      pageLanguage: 'en', 
      includedLanguages: languages, 
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, id);

    $el.addClass('has-rendered');
  };
  
}(window,document,jQuery);
