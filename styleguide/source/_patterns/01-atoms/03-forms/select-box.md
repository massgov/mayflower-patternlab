---
title: Select Box
---
Description: A `<select>`  element with its corresponding `<label>` element and `<option>` elements, wrapped in a containing `<section>` element with additional `<div>` elements with progressive enhancement to achieve a themed drop down list via javascript functionality.

## State: ALPHA

### Notes:
_No limit to number of objects in options array_

### Used In:
- [@organisms/by-author/feedback-form](/?p=organisms-feedback-form)

### Required Variables:
~~~
selectBox {
    label:
        type: string
    id:
        type: string
    options: [
        {
            value:
                type: string
            text: 
                type: string
        },
        {
            value:
                type: string
            text: 
                type: string
        },
        {
            value:
                type: string
            text: 
                type: string
        },
    ]
}
~~~
