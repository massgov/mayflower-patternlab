### Description
This pattern shows a Form with inputs tailored to filtering locations

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Text
* Select Box
* Input Checkbox

### JavaScript Used
* Select Box (js/modules/dropdown.js)
* When included as part of the Location Listing page (js/modules/locationFilters.js)

### Usage Guidelines

- `zipcode.placeAutocomplete.bounds` sets default bounds for google maps api place autocomplete (see: [google maps api docs: LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds)) which will be used in `js/modules/locationFilters`.

### Variables
~~~
locationFilters: {
  zipcode: {
    inputText: {
    type: inputText / required
    },
    placeAutoComplete: {
      bounds: {
        sw: {
          lat: 
            type: float, latitude
          lng:
            type: float, longitude
        },
        ne: {
          lat: 
            type: float, latitude
          lng:
            type: float, longitude
        }
      }
    }
  },
  activity: {
    type: selectBox / optional
  },
  keyword: {
    type: inputText / optional
  },
  tags (optional): [{
    type: array of inputCheckbox / required
    icon: 
      type: string (icon path) / required
  }]   
}
~~~
