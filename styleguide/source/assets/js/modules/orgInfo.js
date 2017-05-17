import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  
  $('.js-org-selector').each(function(i){
    let $el = $(this);
    let data = orgSelector[i];
    let compiledTemplate = getTemplate('orgSelector');
    let $select = $el.find('select').first();
    let $placeholder = $el.find('.js-org-info');

    // get the current select value

    // if the value is not null (default) 

      //render the template based on the value
      renderTemplate("1");

    // When the select changes

      // get the current select value

      // value is null

        // remove the template

      // otherwise render the template based on the value

    // Render the template based on value
    function renderTemplate(value) {
      $placeholder.html(compiledTemplate(data.organizations[value]));
    }


  });

}(window,document,jQuery);
