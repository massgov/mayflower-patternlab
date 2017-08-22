### Description
List of links that can be rendered stack or as two columns

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Rich Text
* Decorative Link

### Variant options
* With a [Short List](./?p=organisms-link-list-with-short-list)
* As a [Stacked](./?p=organisms-link-list-as-stacked) list
* With a [short description](./?p=organisms-link-list-with-description)
* Used as [Helpful Links](./?p=organisms-link-list-as-helpful-links)

### Usage Guidelines
* When this pattern is used in the Right Rail, the Comp Heading will render as a Sidebar Heading and the bullets will disappear.


### Variables
~~~
linkList : {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: { 
    type: sidebarHeading / optional
  },
  description: {
    type: richText / optional
  },
  stacked: 
    type: boolean
  hideBullets: 
    type: boolean
  links : [{
    type: array of decorativeLink / required
  }]
}
~~~
