// Force links to print full path on page print
export default function (window,document,$,undefined) {
  window.onbeforeprint = function() {
   
    $('a:not([href^=https])').each(function(){
      let path = $(this).prop('href');
      $(this).prop('href', path);
    });
  };
}(window,document,jQuery);