### Description
This is a stylized selectbox.

### Status
* Stable as of 5.0.0


### JavaScript Used
* (js/modules/dropdown.js)

### Variables
~~~
selectBox {
  label:
    type: string / required
  required:
    type: boolean
  id:
    type: string (unique per page) / required
  options: [{
    value:
      type: string / required
    text: 
      type: string / required
  }]
}
~~~
