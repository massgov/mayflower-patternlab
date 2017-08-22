### Description
This pattern shows a Form with inputs tailored to filtering locations

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Text
* Select Box
* Input Checkbox

### JavaScript Used
* Select Box (js/modules/dropdown.js)
* When included as part of the Location Listing page (js/modules/locationFilters.js)

### Variables
~~~
locationFilters: {
  zipcode: {
    type: inputText / required
  },
  activity: {
    type: selectBox / optional
  },
  keyword: {
    type: inputText / optional
  },
  tags (optional): [{
    type: array of inputCheckbox / required
    icon: 
      type: string (icon path) / required
  }]   
}
~~~
