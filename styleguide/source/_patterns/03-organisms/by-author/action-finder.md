### Description
A collection of featured and general links

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Comp Heading
* Key Actions

### Variant options
* [Without a Background](./?p=organisms-action-finder-without-background)
* [See All Link](./?p=organisms-action-finder-see-all)
* [Search Filter](./?p=organisms-action-finder-filter)


### Variables
~~~
actionFinder: {
  id:
    type: string (unique per page) /required 
  bgWide:
    type: string (image path) / optional / (required with bgNarrow)
  bgNarrow:
    type: string (image path) / optional
  featuredHeading:
    type: string / required
  generalHeading:
    type: string / required
  compHeading:
    type: compHeading / required

  seeAll: {
    type: decorativeLink / optional
  }

  featuredLinks: [{
    type: illustratedLink or calloutLink / optional,
  }],

  links: [{
    type: illustratedLink or calloutLink / required,
  }]
}
~~~
