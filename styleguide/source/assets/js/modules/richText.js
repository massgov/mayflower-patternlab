import slugify from "../helpers/slugify.js";
export default function (window,document,undefined, $) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    // Allow heading and contents to be indented by adding a helper class and a data attribute used to add margin with
    // a CSS rule.
    if ('.js-outline-indent'.length) {
      $el.find(':header').each(function(index,header){
        $(header).nextUntil(':header')
          .addClass("ma__rich-text__indent")
          .attr('data-ma-heading-parent', $(header).prop('tagName'));
      });
    }
  });

  $('.js-insert-heading-anchors').each(function(){
    let $el = $(this);
    // Get all of the content headings.
    let $headings = $el.find(":header");
    $headings.each(function(index, heading){
      // For H3+
      console.log(slugify);
      if ($(heading).prop("tagName") !== 'H2') {
        // Create an id based on the heading text.
        let id = slugify.slugify($(heading).text());
        // Insert an anchor tag before the heading.
        $(heading).before("<a name='"+id+"'></a>");
      }
    });

  });
}
(window,document,jQuery);