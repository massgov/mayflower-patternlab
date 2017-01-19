---
title: Input Radio
---
Description: An `<input> [type='radio']`  element with its corresponding `<label>` element, wrapped in a containing `<span>` element.

## State: ALPHA

### Notes:
Radio buttons which are related to the form field control should have the same value for inputRadio.name

### Used In:
- [@organisms/by-author/feedback-form](/?p=organisms-feedback-form)

### Variables:
~~~
inputRadio {
    name:
        type: string / required
    value:
        type: string / required
    id:
        type: string / required
    label:
        type: string / required
    checked:
        type: string ("true" || "")
}
~~~
