### Description
An ordered list of steps.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* sidebar Heading
* Action Step


### Variables
~~~
stepsOrdered: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  }
  steps: [{
    type: array of actionStep / required
  }]
}
~~~
