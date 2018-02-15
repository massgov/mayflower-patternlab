export default function (window,document,$,undefined) {

  const sidebarHeight = $('.sidebar').outerHeight( true ) + 100;
  // Set height of sidebar with some bottom space.
  let debounceTimer;
  console.log(sidebarHeight);

  function imgWidth() {
    // Define wrapper width for use.
    var wrapperWidth = $('.main-content').width();

    $('.ma__figure--full').each(function() {
      var $thisImage = $(this);

      // Get position of image relative to container.
      var thisPosition = $thisImage.position().top;

      // If this image is below the sidebar.
      if (thisPosition > sidebarHeight) {

        // Make the image the full width of the wrapper.
        $thisImage.css('width', wrapperWidth);
      }
    });
  }

  $(window).on('load', function() {
    imgWidth();
  });

  $(window).resize(function() {
    if(typeof debounceTimer === "number") {
      window.clearTimeout(debounceTimer);
    }
    debounceTimer = window.setTimeout(function(){
      imgWidth();
    },250);
  });

}
(window,document,jQuery);
