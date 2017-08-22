### Description
This Pattern shows a list of Press Teaser patterns.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Press Teaser

### Variables
~~~
pressListing: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  items: [{
    type: pressTeaser / required
  }]
}
~~~
