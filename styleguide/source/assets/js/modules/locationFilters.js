export default function (window,document,$,undefined) {
  $('.js-location-filters').each(function(){
    let $el = $(this);

    // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function() {
      let $locationFilter = $('.ma__location-filters__by-location', $el).find('input');
      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        ma.autocomplete = new google.maps.places.Autocomplete(document.getElementById($locationFilter.attr('id')));
        ma.autocomplete.setComponentRestrictions({country: 'us'});
      }
    });

    // Listen for new data from another component interaction (i.e. results heading), update form.
    $el.on('ma:FormFilter:DataUpdated', function(e, data){
      renderForm({clearedFilter: data.clearedFilter, $form: $el});
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
      let formData = getFormData({$form: $(this)});

      // Trigger location listing filter event with current filter values.
      $el.trigger('ma:LocationFilter:FormSubmitted', [{formData: formData}]);
    });

  });

  function renderForm(args) {
    let clearedFilter = args.clearedFilter;
    // The clear all button was pressed.
    if (clearedFilter === "all") {
      clearForm(args);
    }
    // Single filter button was pressed.
    else {
      clearDeactivatedFilter(args);
    }
  }

  function getFormData(args) {
    let $form = $(args.$form),
      $location = $form.find('.ma__location-filters__by-location'),
      $tags = $form.find('.ma__location-filters__by-tags'),
      formData = [];

    // Get location
    if ($location.find('input').length) {
      let place = $location.find('input').val();
      if (place) {
        formData.push({
          type: 'location',
          text: place,
          value: place
        });
      }
    }

    $tags.find('input:checked').each(function() {
      formData.push({'type': 'tag', 'value': $(this).val(), 'text': $(this).next("label").text()});
    });

    return formData;
  }

  function clearDeactivatedFilter(args) {
    let $form = $(args.$form),
      $place = $form.find('.ma__location-filters__by-location'),
      $tags = $form.find('.ma__location-filters__by-tags'),
      clearedFilter = args.clearedFilter;

    // If the cleared filter button was for a location filter.
    if (clearedFilter.type === 'location') {
      $place.find('input').val("");
      return;
    }

    // If the cleared filter button was for a tag filter.
    if (clearedFilter.type === 'tag') {
      $tags.find('input[type=checkbox][value=' + clearedFilter.value + ']').prop('checked', false);
    }
  }

  function clearForm(args) {
    let $form = $(args.$form),
      $tags = $('.ma__location-filters__by-tags', $form),
      $place = $('.ma__location-filters__by-location', $form).find('input');

    // Clear location text input.
    if ($place.length) {
      $place.val("");
    }
    // Uncheck all checked tags inputs.
    $tags.find('input:checked').prop('checked', false);
  }

}(window,document,jQuery);
