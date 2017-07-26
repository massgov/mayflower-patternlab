### Description
This is a Two Column content type with a sticky left nav that is being used for How To pages on Mass gov.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Contact List
* Colored Heading
* Sticky Nav


### JavaScript Used
* Sticky Nav (js/modules/scrollAnchors.js)
* Contact List Accordion (js/modules/accordions.js)

### Notes
* This Pattern's Layout is based off of the Two Column template


### Variables
~~~
details: {
  contentTitle: 
    type: string / required
},

pageHeader: {
  type: pageHeader / required
},

stickyNav: {
  type: stickyNav / required
},

sidebar: {
  coloredHeadings: 
    type: boolean (should always be true),

  contactList: {
    type: contactList / required
  }
}
~~~
