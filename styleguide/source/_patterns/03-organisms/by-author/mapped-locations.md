---
title: Mapped Locations
---
Description: A google map with a title and see all link

## State: Alpha

### Contains
- [@atoms/11-text/link.twig](?p=atoms-link)
- [@atoms/04-headings/compHeading.twig](?p=atoms-comp-heading)
- [@molecules/google-map.twig](?p=molecules-google-map)

### Used in:
- [@organisms/by-author/location-banner](?p=organisms-location-banner)
- [@pages/ORG-Health-Services](?p=pages-ORG-Health-Services)

### Required Variables

~~~
mappedLocations: {
  compHeading: see: atoms/04-headings/compHeading.json
  contained: 
    type: boolean
  link: see: atoms/11-text/link.json
  map: see: molecules/google-map.json
}
~~~
