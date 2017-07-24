### Description
List of links that can be rendered stack or as two columns

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading atom (optional)
* Sidebar Heading (optional)
* Rich text (optional)
* Decorative Link

### Variant options
* See Variants for Comp Heading
* [Short List](./?p=organisms-link-list-with-short-list) by passing less than four items
* [Stacked](./?p=organisms-link-list-as-stacked) by setting the stacked variable to true
* With a [short description](./?p=organisms-link-list-with-description) by setting the 'richText variable'


### Variables
~~~
linkList : {
  compHeading: {
    type: object (compHeading)/ optional
  },
  sidebarHeading: { 
    type: object (sidebarHeading)/ optional
  },
  description: {
    type: object (Rich text)/ optional
  },
  stacked: 
    type: boolean
  links : [{
    type: array of object (decorative-link) / required
  }]
}
~~~
