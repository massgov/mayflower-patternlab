import throttle from "../helpers/throttle.js";

export default function (window,document,$,undefined) {

  let responsiveTables = [];

  // Responsive table HTML structure
  // <div class="ma__table--responsive">
  //  <table class="ma__table"> ... </table>
  // </div>
  function initializeTable(element) {
    console.log(element);
    responsiveTables.push(element);
  }


  // apply scroll-based classes

  function applyScrollClasses() {
    responsiveTables.forEach( (element) => {
      let pageTop = $(window).scrollTop();
      let pageBottom = pageTop + $(window).height();
      let elementTop = $(element).offset().top;
      let elementBottom = elementTop + $(element).height();

      console.log(`pt: ${pageTop}, pb: ${pageBottom}, et: ${elementTop}, eb: ${elementBottom}`);

      let topOutOfView = elementTop < pageTop;
      let bottomOutOfView = elementBottom > pageBottom;
      let entirelyOutOfView = elementTop > pageTop && elementBottom < pageBottom;
      $(element).toggleClass('has-top-visible', topOutOfView);
      $(element).toggleClass('has-bottom-visible', bottomOutOfView);
      $(element).toggleClass('is-out-of-view', entirelyOutOfView);
    });
  }

  $(window).on('scroll', throttle(applyScrollClasses, 200));

  $('.js-ma-responsive-table').each((i, el) => initializeTable(el));

}(window,document,jQuery);
