---
title: Search Banner Form
---
Description: A form that displays over a banner background image.

## State: ALPHA

###  Notes

### Used in: 
[@organisms/by-author/search-banner.twig](/?p=organisms-search-banner)

### Contains
[@atoms/03-forms/input-text.twig](/?p=atoms-input-text)
[@atoms/05-icons/svg-search.twig](/?p=atoms-svg-search)

### Variables 
~~~ 
form: {
  content: {
    action:
      type: string / required
    buttonText:
      type: string / required
    inputText: {
      labelText:
        type: string / required
      required:
        type: boolean / required
      id:
        type: string / required
      placeholder:
        type: string / required
    }
  }
}
~~~