export default function (window,document,$,undefined) {

  // Only run this code if we have a js object from location-listing.twig with location listing data.
  if (typeof locationListing === "undefined") {
    return;
  }

  $('.js-location-filters').each(function(){
    let $el = $(this),
      zipcodeSearchId = locationListing.locationFilters.zipcode.inputText.id,
      $byLocation = $el.find('#' + zipcodeSearchId),
      $byTags = $el.find('.ma__location-filters__by-tags'),
      $locationListing = $el.parents('.js-location-listing'),
      masterData = [];

    $locationListing.on('ma:LocationListing:ListingInitialized', function(e, data) {
      // Create the google places autocomplete object and associate it with the zip code text input.
      window.autocomplete = new google.maps.places.Autocomplete(document.getElementById(zipcodeSearchId));
      window.autocomplete.setComponentRestrictions({country: 'us'});
      masterData = data;
    });

    // window.autocomplete.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(41,74), new google.maps.LatLng(43,69)));
    // window.autocomplete.setBounds(new google.maps.LatLngBounds({east: 69, north: 43, south: 41, west: 74}));
    // window.autocomplete.strictBounds = true;
    // window.autocomplete.geocode = true;
    // window.autocomplete.setTypes(['(locality)']);
    // console.log('bounds:', window.autocomplete.getBounds());

    // $el.keydown(function(e) {
    //   if (e.keyCode === 13) {
    //     if (e.target !== $('button.ma__location-filters__submit')) {
    //       console.log(e.target);
    //       e.preventDefault();
    //     }
    //   }
    // });

    // Handle filter form submission.
    $el.submit(function(e){
      e.preventDefault();
      // Update master data with the various filter values.
      masterData.resultsHeading.tags = transformFilterData();

      console.log('trigger ma:LocationListing:FormInteraction: ', [masterData] );
      // Trigger location listing filter event with current filter values.
      $locationListing.trigger('ma:LocationListing:FormInteraction', [masterData]);
    });

    $locationListing.on('ma:LocationListing:ActiveTagInteraction', function(e, data, clearedFilter){
      renderForm(data, clearedFilter);
    });


    function transformFilterData() {
      let location = getLocation(),
        filters = [];

      if (location) {
        filters.push({
          type: 'location',
          text: location,
          value: location
        });
      }

      $byTags.find('input:checked').each(function() {
        filters.push({'type': 'tag', 'value': $(this).val(), 'text': $(this).next("label").text()});
      });

      return filters;
    }

    function getLocation() {
      return $byLocation.val();
    }

    function renderForm(data, clearedFilter) {
      let filters = data.resultsHeading.tags;
      // If the clear all button or the last single filter button was pressed.
      if (clearedFilter === 'all' || !filters.length) {
        // clear all filters
        clearForm();
        return;
      }

      clearDeactivatedFilter(clearedFilter);
    }

    function clearDeactivatedFilter(filter) {
      // If the cleared filter button was for a location filter.
      if (filter.type === 'location') {
        $byLocation.val("");
        return;
      }

      // If the cleared filter button was for a tag filter.
      if (filter.type === 'tag') {
        $byTags.find('input[type=checkbox][value=' + filter.value + ']').prop('checked', false);
        return;
      }
    }

    function clearForm() {
      // Clear location text input.
      $byLocation.val("");
      // Uncheck checked tags inputs.
      $byTags.find('input:checked').prop('checked', false);
    }

  });

}(window,document,jQuery);
