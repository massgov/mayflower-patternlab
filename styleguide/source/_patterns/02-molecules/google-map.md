---
title: Google Map
---
Description: A google map with multiple markers

## State: Alpha

### Used in:
- [@organisms/by-author/location-banner](?p=organisms-location-banner)
- [@organisms/by-author/mapped-locations](?p=organisms-mapped-locations)

### Required Variables
~~~
googleMap: {
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
