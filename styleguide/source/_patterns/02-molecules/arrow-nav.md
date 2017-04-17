---
title: Arrow Nav
---
Description: displays a link to the previous or next page

## Status: alpha

### Notes:

### Contains
- [@atoms/01-buttons/arrow-button](/?p=atoms-arrow-button)

### Used in:


### Variables
~~~
"arrowNav": {
  "arrowButton": {
    type: object/required - see arrow-button.twig
  },
  "title": 
    type: string/required
  "link": {
    "href": 
      type: string/url/required
    "text": 
      type: string/required
    "info": 
      type: string/optional - used for screen readers
  }
}
~~~
