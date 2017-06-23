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


### Variables

~~~
locationListing: {
  maxItems: 
    type: int
    required: no
    description: the max number of items to appear per listing "page" / map
  locationFilters: {
    type: @molecules/location-filters.twig
  }
  googleMap: {
    type: @molecules/google-map.twig
  }
  resultsHeading: {
    type: @molecules/results-heading.twig
  }
  imagePromos: {
    type: @organisms/by-author/image-promos.twig
  }
  pagination: {
    type: @ molecules/pagination.twig
  }
}

~~~
