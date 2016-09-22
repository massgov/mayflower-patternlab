import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  if($('.js-quickaction-link').length === 0) {
    return;
  }

  let compiledTemplate = getTemplate('quickactions'),
      data = {
        title: "Quick Actions",
        items: []
      }


  $('.js-quickaction-link').each(function(){
    let $link = $(this).find('a');

    data.items.push({
      href: $link.attr('href'),
      external: $link.attr('target') === "_blank",
      text: $.trim($link.text())
    });
  });

  // prepend the quickaction list to the quick action components
  let template = compiledTemplate(data);
  $('.page-content').prepend(template);
  $('.sidebar').prepend(template);

}(window,document,jQuery);