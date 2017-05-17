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
    filterButtonSelector = 'button.ma__results-heading__tag',
    masterData = [];

  // Handle clear all button click + trigger clear all event.
  $locationListing.on('click', clearAllButtonSelector, function(){
    // Remove all tags, clear all button from heading.
    masterData.resultsHeading.tags = [];
    // renderResultsHeading(masterData.resultsHeading);

    // Trigger clear all location listing filters event.
    $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [masterData]);
  });

  // Handle single filter button click and trigger single active filter clear event.
  $locationListing.on('click', filterButtonSelector, function(e){
    let clearedFilter = {
      'type': $(e.target).data('ma-filter-type'),
      'value': $(e.target).data('ma-filter-value'),
      'text': $(e.target).text()
    };

    // Remove the clicked tag from the tags array.
    masterData.resultsHeading.tags = masterData.resultsHeading.tags.filter(function(tag){
      return tag.value !== clearedFilter.value;
    });
    // renderResultsHeading(masterData.resultsHeading);

    console.log('trigger ma:LocationListing:ActiveTagInteraction: ', masterData, clearedFilter);
    // Trigger the single filter clear event.
    $locationListing.trigger('ma:LocationListing:ActiveTagInteraction', [masterData, clearedFilter]);
  });

  // Listen for new listing page load to create new results heading
  $locationListing.on('ma:LocationListing:ListingsUpdated', function(e, data){
    masterData = transformResultsHeading(data);
    renderResultsHeading(masterData.resultsHeading);
  });

  function transformResultsHeading(data) {
    data.resultsHeading.totalResults = data.items.length;
    data.resultsHeading.numResults = "1-" + data.resultsHeading.shownItems.length;
    return data;
  }

  function renderResultsHeading(resultsHeading) {
    resultsHeading.markup = compiledTemplate(resultsHeading);
    $locationListing.find(resultsHeadingSelector).replaceWith(resultsHeading.markup);
  }

}(window,document,jQuery);
