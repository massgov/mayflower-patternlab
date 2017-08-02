### Description
A list of events where each item displays the Name, Location, Time, Date and a brief description of that event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Event Teaser
* Link

### Variant options
* Can be used in the [Right Rail](./?p=organisms-event-listing-as-sidebar)
* Renders as two columns with a background in [Post Content](./?p=organisms-event-listing-as-post-content)


### Variables
~~~
eventListing: {
  compHeading:{
    type: compHeading / optional
  },
  sidebarHeading:{
    type: compHeading / optional
  },
  events:[{
    type: eventTeaser / required
  }],
  more:{
    type: link / optional
  }
}
~~~
