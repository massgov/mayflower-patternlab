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
* This pattern can also be used in the [Right Rail](./?p=organisms-event-list-in-template) or as two columns with a background in [Post Content](./?p=organisms-event-list-in-template)
* This Pattern can also be rendered as a [Grid](./?p=organisms-event-list-as-grid)


### Variables
~~~
eventList: {
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
