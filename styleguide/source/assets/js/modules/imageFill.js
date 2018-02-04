export default function (window,document,$,undefined) {

  var sidebarHeight = $('.sidebar').height();
  var wrapperWidth = $('.main-content').width();

  $('.ma__figure--full').each(function() {
    var $thisImage = $(this);
    var thisPosition = $thisImage.offset().top;

    if (thisPosition > sidebarHeight) {
      $thisImage.css('width', wrapperWidth);
    }
  });
}
(window,document,jQuery);
