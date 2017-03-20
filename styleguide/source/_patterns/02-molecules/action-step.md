---
title: Action Step
---
Description: Displays rich text follow by optional download links and learn more link.

## Status: alpha

### Notes:

### Contains
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@molecules/download-link](/?p=molecules-download-link)
- [@atoms/decorative-link](/?p=atoms-decorative-link)

### Used in:
- [@organisms/by-author/action-steps](/?p=organisms-action-steps)

### Variables
~~~
actionStep: {
  "rteElements": 
    type: see Rich Text pattern,
  "downloadLinks": [{
    type: array/optional

    "downloadLink": 
      type: see Download Link pattern
  }],
  "decorativeLink": 
    type see: Decorative Link pattern
}
~~~
