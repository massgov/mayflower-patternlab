export default function (window,document,$,undefined) {
  $('.js-location-filters').each(function(){
    let $el = $(this),
      zipcodeSearchId = locationListing.locationFilters.zipcode.inputText.id,
      $byLocation = $el.find('#' + zipcodeSearchId),
      $byTags = $el.find('.ma__location-filters__by-tags'),
      $submit = $el.find('.ma__location-filters__submit'),
      $locationListing = $el.parents('.js-location-listing');

    // Create the autocomplete object and associate it with the submit button.
    // Restrict the search to the default country, and to place type "cities".
    $locationListing.on('mapInitialized', function(){
      console.log(locationListing.locationFilters.zipcode.id);
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById(zipcodeSearchId));
    });


    // Handle filter form submission.
    $el.submit(function(e){
      e.preventDefault();
      // Get the various filter values.
      let location = $byLocation.val();

      let tags = [];
      $byTags.find('input:checked').each(function() {
        tags.push({'type': 'tag', 'value': $(this).val(), 'text': $(this).next("label").text()});
      });

      // Trigger location listing filter event with current filter values.
      $locationListing.trigger('maLocationFilter', [location, tags]);
    });

    // Listen for single filter clear. (Triggered in resultsHeading.js)
    $locationListing.on('maSingleFilterClear', function(e, clearedFilter){
      if (clearedFilter.type === "location") {
        // Clear location text input.
        $byLocation.val("");
        return;
      }
      if (clearedFilter.type === "tag") {
        // Uncheck cleared tag input.
        $byTags.find('input[type=checkbox][value=' + clearedFilter.value + ']').attr('checked', false);
      }
    });

    // Listen for clear filters event. (Triggered in resultsHeading.js)
    $locationListing.on('maClearAllLocationFilters', function(e){
      // Clear location text input.
      $byLocation.val("");
      // Uncheck checked tags inputs.
      $byTags.find('input:checked').attr('checked', false);
    });

  });

}(window,document,jQuery);
