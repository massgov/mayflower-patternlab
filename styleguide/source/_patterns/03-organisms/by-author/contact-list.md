---
title: Contact List
---

### Description
Displays one of more Contacts Us patterns as a stacked list of accordions.

### Status
* Stable as of 1.0.0

### Pattern Contains
* Contact Us
* Comp Heading

### Variant options
* Turning on the viewSpecific variable, will hide the component at certain points when used on a two column layout.  When placed in the sidebar, it will hide when the page is a single column.  When placed in the page-content, it will hide when the page is two columns.

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
contactList: {
  viewSpecific: 
    type: boolean,
  compHeading: {
    type: compHeading / optional
  },
  contacts:[{
    type: array of contactUs / required
  }]
~~~
