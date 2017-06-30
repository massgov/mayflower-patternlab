---
title: Input Text
---
Description: An `<input> [type='text']`  element with its corresponding `<label>` element.

## State: ALPHA

### Notes:

### Used In:
- [@organisms/by-author/feedback-form](/?p=organisms-feedback-form)
- [@molecules/search-banner-form](/?p=molecules-search-banner-form)

### Variables:
~~~
  inputText: {
    labelText:
      type: string/required,
    required: 
      type: boolean,
    id: 
      type: string/unique/required
    name: 
      type: string/required
    type:
      type: string ('text','email', etc...) / required
    maxlength:
      type: number / optional
    pattern:
      type: string / optional (ex: "[0-9]" for numbers only)
    width:
      type: string (number value) / optional
    placeholder:
      type: string /optional
    errorMsg:
      type: string /optional
  }
~~~
