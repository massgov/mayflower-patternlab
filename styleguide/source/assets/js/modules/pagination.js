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

  // Set up global component config
  let compiledTemplate = getTemplate('pagination'),
    el = '.js-pagination',
    prevButton = 'button.ma__pagination__prev',
    nextButton = 'button.ma__pagination__next',
    pageButton = 'button.ma__pagination__page';

  $('.js-pagination').each(function(){
    // Set up instance specific config
    let $el = $(this);

    /**
     * Location Listing config, event listeners
     */

    // Set location listing specific config
    let $locationListing = $el.parents('.js-location-listing'); // context
    // Set location listing specific listeners, when parent component is initialized.
    $locationListing.on('ma:LocationListing:ListingInitialized', function() {
      // Set event listeners on parent component because original DOM nodes will be replaced on render().

      // Listen for previous page button click and trigger pagination event.
      $locationListing.on('click', prevButton, function () {
        $locationListing.trigger('ma:LocationListing:Pagination', ['previous']);
      });
      // Listen for next button click and trigger pagination event.
      $locationListing.on('click', nextButton, function () {
        $locationListing.trigger('ma:LocationListing:Pagination', ['next']);
      });
      // Listen for page number button click and trigger pagination event;
      $locationListing.on('click', pageButton, function (e) {
        let targetPageNumber = $(e.target).data('page');
        $locationListing.trigger('ma:LocationListing:Pagination', [targetPageNumber]);
      });
      // Listen for new location listing results load, render new results heading.
      $locationListing.on('ma:LocationListing:ListingsUpdated', function (e, data) {
        renderPagination({data: data.pagination, context: $locationListing});
      });
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
    args.data.markup = compiledTemplate(args.data);

    // Populate the appropriate instance.
    if (args.context) {
      args.context.find(el).replaceWith(args.data.markup);
    }
    else $(el).replaceWith(args.data.markup);
  }

}(window,document,jQuery);
