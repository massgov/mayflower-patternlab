import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  // Only run this code if we have a js object from location-listing.twig with location listing data.
  if (typeof locationListing === "undefined") {
    return;
  }

  let $locationListing = $('.js-location-listing'),
    compiledTemplate = getTemplate('locationListingResultsHeading'),
    resultsHeadingSelector = '.js-results-heading',
    clearAllButtonSelector = 'button.ma__results-heading__clear',
    filterButtonSelector = 'button.ma__results-heading__tag';

  // Handle clear all button click + trigger clear all event.
  $locationListing.on('click', clearAllButtonSelector, function(){
    // Trigger clear all location listing filters event.
    $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [{clearedFilter: 'all'}]);
  });

  // Handle single filter button click and trigger single active filter clear event.
  $locationListing.on('click', filterButtonSelector, function(e){
    let clearedFilter = {
      'type': $(e.target).data('ma-filter-type'),
      'value': $(e.target).data('ma-filter-value'),
      'text': $(e.target).text()
    };

    // Trigger the single filter clear event.
    $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [{clearedFilter: clearedFilter}]);
  });

  // Listen for new listing page load to create new results heading
  $locationListing.on('ma:LocationListing:ListingsUpdated', function(e, data){
    renderResultsHeading(data.resultsHeading);
  });

  function renderResultsHeading(resultsHeading) {
    resultsHeading.markup = compiledTemplate(resultsHeading);
    $locationListing.find(resultsHeadingSelector).replaceWith(resultsHeading.markup);
  }

}(window,document,jQuery);
