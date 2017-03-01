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
          type: string(html)/required
        phone:
          type: string/optional
        fax:
          type: string/optional
        email:
          type: string/optional
        address:
          type: string(html)/required
      }
    }]
  }
}
~~~
