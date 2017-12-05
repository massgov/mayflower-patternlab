export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(){
    let $el = $(this);

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    // Allow heading and contents to be indented.
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
      if ($(heading).prop("tagName") !== 'H2') {
        // Create an id based on the heading text.
        let id = slugify($(heading).text());
        // Insert an anchor tag before the heading.
        $(heading).before("<a name='"+id+"'></a>");
      }
    });

    function slugify(text)
    {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
  });
}
(window,document,jQuery);