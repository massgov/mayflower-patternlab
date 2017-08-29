---
title: Event Filters
---

Description: Form with inputs used on Event listing page

## State: Alpha

### Notes

- `zipcode.placeAutocomplete.bounds` sets default bounds for google maps api place autocomplete (see: [google maps api docs: LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds)) which will be used in `/assets/js/modules/eventFilters`.

### Used in:


### contains:
- [@atoms/03-forms/input-text](?p=atoms-input-text)
- [@molecules/date-range](?p=molecules-date-range)


### Required Variables
~~~
{
  eventFilters: {
    zipcode: {    
      inputText: {
        type: object/inputText/required,
      },
      
      placeAutoComplet: {
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
    
    dateRange: {
      type: object/dateRange/required
    },

    submitButton:
      type: string/required   
  }

}
~~~

