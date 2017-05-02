---
title: Pagination
---
Description: Used on listing pages as controls to adjust which results shown.

## State: Alpha

### Required variables
~~~
pagination: {
  "next": {
    type: object/optional
    "disabled": 
      type: boolean,
    "text": 
      type: string/required
  },
  "prev": {
    type: object/optional
    "disabled": 
      type: boolean,
    "text": 
      type: string/required
  },
  "pages": [{
    type: array/required
    "active": 
      type: boolean,
    "text": 
      type: string/required
  }]
}
~~~
