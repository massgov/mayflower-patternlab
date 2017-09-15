### Description
A collection of featured and general links

### Status
* Stable as of 5.0.0

### Pattern Contains
* Callout Link
* Illustrated Link
* Decorative Link

### Variant options
* [Without a Background](./?p=organisms-featured-callouts-without-background)
* [See All Link](./?p=organisms-featured-callouts-see-all)
* [Search Filter](./?p=organisms-featured-callouts-filter)


### Variables
~~~
featuredCallouts: {
  id:
    type: string (unique per page) /required 
  bgWide:
    type: string (image path) / optional / (required with bgNarrow)
  bgNarrow:
    type: string (image path) / optional
  title:
    type: string / required
  featuredHeading:
    type: string / required
  generalHeading:
    type: string / required

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
