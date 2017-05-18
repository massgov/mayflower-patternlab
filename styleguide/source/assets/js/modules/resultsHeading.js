import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  // Set up global component config
  let compiledTemplate = getTemplate('locationListingResultsHeading'),
    el = '.js-results-heading',
    clearAllButton = 'button.ma__results-heading__clear', // events triggered on parent
    filterButton = 'button.ma__results-heading__tag'; // events triggered on parent

  $(".js-results-heading").each(function() {
    const $el = $(this);

    /**
     * Location Listing config, event listeners
     */

    // Set location listing specific config
    let $locationListing = $el.parents('.js-location-listing'); // context
    // Set location listing specific listeners, when parent component is initialized.
    $locationListing.on('ma:LocationListing:ListingInitialized', function() {
      // Set event listeners on parent component because original DOM nodes will be replaced on render().

      // Listen for clear all button click + trigger interaction event on parent.
      $locationListing.on('click', clearAllButton, function () {
        $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [{clearedFilter: 'all'}]);
      });
      // Listen for single filter button click and trigger interaction event on parent.
      $locationListing.on('click', filterButton, function (e) {
        let clearedFilter = {
          'type': $(e.target).data('ma-filter-type'),
          'value': $(e.target).data('ma-filter-value'),
          'text': $(e.target).text()
        };

        $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [{clearedFilter: clearedFilter}]);
      });
      // Listen for new location listing results load, render new results heading.
      $locationListing.on('ma:LocationListing:ListingsUpdated', function (e, data) {
        renderResultsHeading({data: data.resultsHeading, context: $locationListing});
      });
    });

  });

  /**
   * Renders the contents of a specific results heading component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderResultsHeading(args) {
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
