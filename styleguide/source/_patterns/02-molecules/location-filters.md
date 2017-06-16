

---
title: Location Filters
---
Description: Form with input used on location listing organism

## State: Alpha

### Notes

### Used in:
- [@organism/by-author/location-listing](?p=organism-location-listing)

### contains:
- [@atoms/03-forms/input-text](?p=atoms-input-text)
- [@atoms/03-forms/select-box](?p=atoms-select-box)
- [@atoms/03-forms/input-checkbox](?p=atoms-input-checkbox)


### Required Variables
~~~
"locationFilters": {
  "zipcode": {
    type: inputText/required - see atoms/03-forms/input-text.md
  },
  "activity": {
    type: selectBox/optional - see atoms/03-forms/select-box.md
  },
  "keyword": {
    type: inputText/optional - see atoms/03-forms/input-text.md
  },
  "tags": [{
    type: array of inputCheckbox/optional + icon property
    // see @atoms/forms/input-checkbox.md
    // see @molecules/image-promo.md
  }]   
}
~~~

