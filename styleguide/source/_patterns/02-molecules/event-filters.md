### Description
This Filter input area with inputs for location and date range.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Text
* Date Range
* Button

### Variables
~~~
eventFilters: {
  zipcode: {    
    type: inputText / required
  },
  
  dateRange: {
    type: dateRange / required
  },

  buttons: [{
    type: array of Button / required
  }]
}
~~~
