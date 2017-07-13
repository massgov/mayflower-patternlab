---
title: Input Group
---
Description: Renders a group of radio buttons or checkboxes with an optional title.

## State: ALPHA

### Notes:
- radio button groups should always have required set to true for 508 compliance and because you can't reset a radio button group.

### Used In:


### Variables:
~~~
inputGroup: {
  required: 
    type: boolean
  inline: 
    type: boolean
  title: 
    type: string / optional 
  type: 
    type: string ('radio' or 'checkbox') / required
  items: [{
    type: array of objects - uses inputRadio object for both radio and checkboxes.
  }]
}
~~~
