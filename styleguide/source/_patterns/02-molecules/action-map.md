---
title: DEPRECATED - Action Map
---
Description: A google map that fits the width of it's containing element.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display a google map anywhere in the site.
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/location-banner](?p=organisms-location-banner)
### Required Variables
~~~
actionMap: {
  map: {
    center: {
      lat:
        type: integer/required
      lng:
        type: integer/required
      },
      zoom:
        type: integer/required
    },
    markers: [{
      position: {
        lat:
          type: integer/required
        lng:
          type: integer/required
      },
      label:
        type: string/required
      infoWindow: {
        name:
          type: string/required
        phone:
          type: string/required
        fax:
          type: string/required
        email:
          type: string/required
        address:
          type: string/required
        address2:
          type: string/required
        city:
          type: string/required
        state:
          type: string/required
        zip:
          type: string/required
      }
    }]
  }
}
~~~
