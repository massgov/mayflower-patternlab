---
title: Link List
---
Description: List of links that can be rendered stack or two column

## State: Alpha

### Notes


### Contains
- [@atoms/04-headings/comp-heading](?p=atoms-comp-heading)
- [@atoms/04-headings/sidebar-heading](?p=atoms-sidebar-heading)
- [@organisms/by-author/rich-text](?p=organisms-rich-text)
- [@atoms/decorative-link](?p=atoms-decorative-link)

### Used in:


### Required Variables

~~~
linkList : {
  compHeading: {
    type: object (compHeading)/ optional
  },
  sidebarHeading: { 
    type: object (sidebarHeading)/ optional
  },
  description: {
    type: object (Rich text)/ optional
  },
  stacked: 
    type: boolean
  links : [{
    type: array of object (decorative-link) / required
  }]
}

~~~
