export default function (window,document,$,undefined) {

  $('.js-location-filters').each(function(i){
    let $el = $(this),
      placeId = ''; // specified per instance

    /**
     * Location Listing config, event listeners
     */
    let $locationListing = $el.parents('.js-location-listing');

    // Set location listing specific listeners, when parent component is initialized.
    $locationListing.on('ma:LocationListing:ListingInitialized', function() {
      // Set location listing specific placeId.
      placeId = locationListing[i].locationFilters.zipcode.inputText.id;

      // Create the google places autocomplete object and associate it with the zip code text input.
      window.autocomplete = new google.maps.places.Autocomplete(document.getElementById(placeId));
      window.autocomplete.setComponentRestrictions({country: 'us'});


      // Listen for location listing tag interaction event, update form.
      $locationListing.on('ma:LocationListing:ActiveTagInteraction', function(e, data){
        renderForm({data: data.clearedFilter, form: $el, placeId: placeId});
      });
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

    // Handle global form submission.
    $el.submit(function(e){
      e.preventDefault();
      // Update master data with the various filter values.
      let filters = getFormData({form: $(this), placeId: placeId});

      // Trigger location listing filter event with current filter values.
      $locationListing.trigger('ma:LocationListing:FormInteraction', [{filters: filters}]);
    });

  });

  function renderForm(args) {
    // The clear all button was pressed.
    if (args.data === 'all') {
      clearForm(args);
    }
    // Single filter button was pressed.
    else {
      clearDeactivatedFilter(args);
    }
  }

  function getFormData(args) {
    let $form = $(args.form),
      $tags = $form.find('.ma__location-filters__by-tags'),
      filters = [];

    // Get place
    let placeId = '#' + args.placeId;
    let place = $form.find(placeId).val();

    if (place) {
      filters.push({
        type: 'location',
        text: place,
        value: place
      });
    }

    $tags.find('input:checked').each(function() {
      filters.push({'type': 'tag', 'value': $(this).val(), 'text': $(this).next("label").text()});
    });

    return filters;
  }

  function clearDeactivatedFilter(args) {
    let $form = $(args.form),
      $place = $form.find(args.placeId),
      $tags = $form.find('.ma__location-filters__by-tags'),
      clearedFilter = args.data;

    // If the cleared filter button was for a location filter.
    if (clearedFilter.type === 'location') {
      $place.val("");
      return;
    }

    // If the cleared filter button was for a tag filter.
    if (clearedFilter.type === 'tag') {
      $tags.find('input[type=checkbox][value=' + clearedFilter.value + ']').prop('checked', false);
    }
  }

  function clearForm(args) {
    let $form = $(args.form),
      $tags = $form.find('.ma__location-filters__by-tags'),
      $place = $form.find('#' + args.placeId);

    // Clear location text input.
    $place.val("");
    // Uncheck all checked tags inputs.
    $tags.find('input:checked').prop('checked', false);
  }

}(window,document,jQuery);
