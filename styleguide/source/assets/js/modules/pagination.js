import getTemplate from "../helpers/getHandlebarTemplate.js";
export default function (window,document,$,undefined) {
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

  $('.js-pagination').each(function(){
    let $el = $(this),
      $locationListing = $el.parents('.js-location-listing'),
        compiledTemplate = getTemplate('pagination'),
        paginationSelector = '.js-pagination',
        prevButton = 'button.ma__pagination__prev',
        nextButton = 'button.ma__pagination__next',
        pageButton = 'button.ma__pagination__page';

    // Handle previous page button click and trigger pagination event.
    $locationListing.on('click', prevButton, function(){
      $locationListing.trigger('ma:LocationListing:Pagination', ['previous']);
    });

    // Handle next button click and trigger pagination event.
    $locationListing.on('click', nextButton, function(){
      $locationListing.trigger('ma:LocationListing:Pagination', ['next']);
    });

    // Handle page number button click and trigger pagination event;
    $locationListing.on('click', pageButton, function(e){
      let targetPageNumber = $(e.target).data('page');
      $locationListing.trigger('ma:LocationListing:Pagination', [targetPageNumber]);
    });

    $locationListing.on('ma:LocationListing:ListingsUpdated', function(e, data){
      renderPagination(data.pagination);
    });

    function renderPagination(pagination) {
      pagination.markup = compiledTemplate(pagination);
      $locationListing.find(paginationSelector).replaceWith(pagination.markup);
    }
  });

}(window,document,jQuery);
