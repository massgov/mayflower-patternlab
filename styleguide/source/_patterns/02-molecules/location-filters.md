

---
title: Location Filters
---
Description: Form with input used on location listing organism

## State: Alpha

### Notes

- `zipcode.placeAutocomplete.bounds` sets default bounds for google maps api place autocomplete (see: [google maps api docs: LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds)) which will be used in `/assets/js/modules/locationFilters`.

### Used in:
- [@organism/by-author/location-listing](?p=organism-location-listing)

### contains:
- [@atoms/03-forms/input-text](?p=atoms-input-text)
- [@atoms/03-forms/select-box](?p=atoms-select-box)
- [@atoms/03-forms/input-checkbox](?p=atoms-input-checkbox)


### Required Variables
~~~
locationFilters: {
  zipcode: {
    inputText: {
      type: inputText/required - see atoms/03-forms/input-text.md
    },
    placeAutoComplete: {
      bounds: {
        sw: {
          lat: 
            type: int, latitude
          lng:
            type: int, longitude
        },
        ne: {
          lat: 
            type: int, latitude
          lng:
            type: int, longitude
        }
      }
    }
  },
  activity: {
    type: selectBox/optional - see atoms/03-forms/select-box.md
  },
  keyword: {
    type: inputText/optional - see atoms/03-forms/input-text.md
  },
  tags: [{
    type: array of inputCheckbox/optional + icon property
    // see @atoms/forms/input-checkbox.md
    // see @molecules/image-promo.md
  }]   
}
~~~

