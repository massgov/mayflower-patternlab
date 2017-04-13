

---
title: Location Filters
---
Description: Form with input used on location listing organism

## State: Alpha

### Notes

### Used in:
- [@organism/by-author/location-listing](?p=organism-location-listing)


### Required Variables
~~~
"locationFilters": {
  "zipcode": {
    type: object/required
    "inputText": {
      "labelText": 
        type: string/required,
      "required": 
        type: boolean,
      "id": 
        type: string/required,
      "name": 
        type: string/required,
      "placeholder": 
        type: string/optional
    },
    "buttonSearch": {
      "text": 
        type: string/required
    }
  },
  "activity": {
    type: object/optional
    "label":
      type: string/required
    "id":
      type: string/required
    "options":[{
      type: array/required
      "value":
        type: string/required
      "text":
        type: string/required
    }]
  },
  "keyword": {
    type: object/optional
    "inputText": {
      "labelText": 
        type: string/required,
      "required": 
        type: boolean,
      "id": 
        type: string/required,
      "name": 
        type: string/required,
      "placeholder": 
        type: string/optional
    },
    "buttonSearch": {
      "text": 
        type: string/required
    }
  },
  "tags": [{
    type: array/optional
    "value": 
      type: string/required
    "id": 
      type: string/required
    "label": 
      type: string/required
    "checked": 
      type: string/optional ("true" or "false")
    "icon": 
      type: string/path/required
  }]   
}
~~~

