---
title: Location Listing
---
Description: List of location with matching icons on a google map

## State: Alpha

### Notes
- The order of the result list and map icons need to match.

### Contains
- [@molecules/image-promo](?p=molecules-image-promo)
- [@molecules/google-map](?p=molecules-google-map)

### Used in:


### Required Variables

~~~
locationListing: {
  googleMap: {
    type: @molecules/google-map.twig
  }
  results: [{
    type: @molecules/image-promo.twig
  }]
}

~~~
