### Description
A google map with a title and see all link

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading (optional)
* Google Map
* Decorative Link

### Variant options
* Wrapped in a colored [container](./?p=organisms-mapped-locations-contained)

### Usage Guidelines
* The decorative link is placed above the map for accessibility reasons.

### JavaScript Used
* This pattern uses JavaScript for the Google map (js/modules/googleMap.js)

### Variables
~~~
mappedLocations: {
  compHeading: 
    type: compHeading / optional
  contained: 
    type: boolean
  link: 
    type: decorativeLink / optional
  map: 
    type: googleMap / required
}
~~~
