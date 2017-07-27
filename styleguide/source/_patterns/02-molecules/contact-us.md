### Description
This pattern displays contact information grouped by type.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Column Heading
* Contact Group

### Variant options
* With a [linked title](./?p=molecules-contact-us-with-linked-title)
* As a [accordion](./?p=molecules-contact-us-as-accordion)
* 

### Usage Guidelines
* This component can be viewed as an accordion or in list view
* in List view, the first two contact groups should be visible and the remainder are collapsed.

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
contactUs: {
  accordion: 
    type: boolean
  isExpanded:
    type: boolean
  subTitle: {
    type: columnHeading / optional
  }
  groups: [{
    type: array of contactGroup / required
  }]
}
~~~
