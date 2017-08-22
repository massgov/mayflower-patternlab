### Description
List of links that can be rendered stack or as two columns

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Decorative Link

### Variant options
* Rendered as [two columns](./?p=organisms-helpful-links-as-columns)


### Variables
~~~
helpfulLinks: {
  columns: 
    type: string ("", "true") / optional
  compHeading: {
    type: compHeading / required
  },
  items: [{
    type: array of decorativeLink / required
  }]
}
~~~
