---
title: Input Radio
---
Description: An `<input> [type='radio']`  element with its corresponding `<label>` element, wrapped in a containing `<span>` element.

## State: ALPHA

### Notes:
Radio buttons which are related to the form field control should have the same value for inputRadio.name

### Used In:
- [@organisms/by-author/feedback-form](/?p=organisms-feedback-form)

### Required Variables:
~~~
inputRadio {
    name:
        type: string
    value:
        type: string
    id:
        type: string
    label:
        type: string
    checked:
        type: string ("true" || "false")
}
~~~
