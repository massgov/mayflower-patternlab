export default function (window,document,$,undefined) {

  $('.js-ma-rich-text table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

  // get the external SVG link code
  fetch(themePath + '/images/svg-icons/arrow.svg', {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    // find all external links that need an icon
    $('.js-ma-rich-text a').each(function(){
      let $el = $(this);

      if($el.children().length !== 0) {
        return false;
      }

      // wrap the link in a span tag
      $el.wrap('<span class="ma__decorative-link"></span>');
      // append the SVG to the link
      $el.append('&nbsp;' + data);
    });
  }).catch(function(e){
    console.error('failed to style rich text link');
  });

}(window,document,jQuery);