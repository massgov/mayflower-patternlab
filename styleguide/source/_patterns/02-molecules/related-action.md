---
title: Related action link
---
Description: a molecule for an related action.
## Status: Alpha
### Notes:
- This style has the potential to be generalized for a related link used elsewhere in the site.
- Small markup changes are required. The description text will not be wrapped in a paragraph text in the future.
### Used in:
- [@organisms/by-author/sidebar-widget](?p=organisms-sidebar-widget)
### Required Variables
~~~
relatedAction {
  level:
  	 type: intrger/required
  link {
    type:
      string
    href:
      string
    text:
      string
  }
  description: string
~~~
