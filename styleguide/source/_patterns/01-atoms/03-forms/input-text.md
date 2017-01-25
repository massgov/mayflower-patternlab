---
title: Input Text
---
Description: An `<input> [type='text']`  element with its corresponding `<label>` element.

## State: ALPHA

### Notes:
Any text input field will have the same label (Your Name) and will always be required.

### Used In:
- [@organisms/by-author/feedback-form](/?p=organisms-feedback-form)
- [@molecules/search-banner-form](/?p=molecules-search-banner-form)

### Variables:
~~~
  inputText: {
    labelText:
      type: string\required,
    required: 
      type: boolean,
    id: 
      type: string\unique\required
    name: 
      type: string\required
    placeholder:
      type: string
  }
~~~
