### Description
A google map with multiple markers and info windows

### Status
* Stable as of 5.0.0


### JavaScript Used
* Google Map (js/modules/googleMap.js)

### Variables
~~~
googleMap: {
  map: {
    center: {
      lat:
        type: integer / required
      lng:
        type: integer / required
      },
      zoom:
        type: integer / required
    },
    markers: [{
      position: {
        lat:
          type: integer / required
        lng:
          type: integer / required
      },
      label:
        type: string / required
      infoWindow: {
        name:
          type: string / required
        phone:
          type: string (number with no spaces) / optional
        fax:
          type: string / optional
        email:
          type: string / optional
        address:
          type: string / required
        directions:
          type: string (url) / optional
      }
    }]
  }
}
~~~
