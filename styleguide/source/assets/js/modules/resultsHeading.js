import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  let resultsHeading = locationListing.resultsHeading,
    $locationListing = $('.js-location-listing'),
    compiledTemplate = getTemplate('locationListingResultsHeading'),
    resultsHeadingSelector = '.js-results-heading',
    clearAllButtonSelector = 'button.ma__results-heading__clear',
    filterButtonSelector = 'button.ma__results-heading__tag';

  // Handle clear all button click + trigger clear all event.
  $locationListing.on('click', clearAllButtonSelector, function(){
    // Trigger clear all location listing filters event.
    $locationListing.trigger('maClearAllLocationFilters');

    // Remove all tags, clear all button from heading.
    resultsHeading.tags = [];
    renderResultsHeading(resultsHeading);
  });

  // Handle location filter event (triggered in locationFilters.js).
  $locationListing.on('maLocationFilter', function(e, location, tags){
    // Build new active filter tags for selected location, tags.
    if (location) {
      tags.push({'type': 'location', 'value': location, 'text': location});
    }
    resultsHeading.tags = tags;
    renderResultsHeading(resultsHeading);
  });

  // Handle single filter button click and trigger single active filter clear event.
  $locationListing.on('click', filterButtonSelector, function(e){
    let clearedFilter = {
      'type': $(e.target).data('ma-filter-type'),
      'value': $(e.target).data('ma-filter-value'),
      'text': $(e.target).text()
    };

    // Remove the clicked tag from the tags array.
    resultsHeading.tags = resultsHeading.tags.filter(function(tag){
      return tag.value !== clearedFilter.value;
    });
    renderResultsHeading(resultsHeading);

    // Trigger the single filter clear event.
    $locationListing.trigger('maSingleFilterClear', [clearedFilter]);
  });

  function renderResultsHeading(resultsHeading) {
    resultsHeading.markup = compiledTemplate(resultsHeading);
    $locationListing.find(resultsHeadingSelector).replaceWith(resultsHeading.markup);
  }

}(window,document,jQuery);
