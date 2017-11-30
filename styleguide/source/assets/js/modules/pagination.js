import getTemplate from "../helpers/getHandlebarTemplate.js";
export default function (window,document,$,undefined) {

  if($('.js-pagination').length === 0) {
    return;
  }

  // {{compare unicorns ponies operator="<"}}
  // 	I knew it, unicorns are just low-quality ponies!
  // {{/compare}}
  //
  // (defaults to == if operator omitted)
  //
  // {{equal unicorns ponies }}
  // 	That's amazing, unicorns are actually undercover ponies
  // {{/equal}}
  // (from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/)
  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    let operator = options.hash.operator || "==";

    let operators = {
      '==':		function(l,r) { return l == r; },
      '===':	function(l,r) { return l === r; },
      '!=':		function(l,r) { return l != r; },
      '<':		function(l,r) { return l < r; },
      '>':		function(l,r) { return l > r; },
      '<=':		function(l,r) { return l <= r; },
      '>=':		function(l,r) { return l >= r; },
      'typeof':	function(l,r) { return typeof l == r; }
    };

    if (!operators[operator])
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    let result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

  // Set up global component config
  let compiledTemplate = getTemplate('pagination'),
    prevButton = '.js-pagination-prev',
    nextButton = '.js-pagination-next',
    pageButton = '.js-pagination-page';

  $('.js-pagination').each(function(){
    let $el = $(this);

    // Listen for previous page button click and trigger pagination event.
    $el.on('click', prevButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['previous']);
    });
    // Listen for next button click and trigger pagination event.
    $el.on('click', nextButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['next']);
    });
    // Listen for page number button click and trigger pagination event;
    $el.on('click', pageButton, function (e) {
      let targetPageNumber = $(e.target).data('page');
      $el.trigger('ma:Pagination:Pagination', [targetPageNumber]);
    });

    // Listen for new data, render new pagination.
    $el.on('ma:Pagination:DataUpdated', function (e, data) {
      renderPagination({data: data, $el: $el});
    });
  });

  /**
   * Renders the contents of a specific results pagination component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderPagination(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }

    // Create new markup using handlebars template, helper.
    let markup = compiledTemplate(args.data);
    args.$el.html(markup);
  }

}(window,document,jQuery);
