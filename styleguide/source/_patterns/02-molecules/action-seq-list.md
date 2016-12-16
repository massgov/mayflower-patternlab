---
title: DEPRECATED - Action Sequential List
---
Description: A section of content on an action page that includes a title and multiple types of content.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display anywhere in the site.
- The action section defines the type of content it displays via the ```path``` variable it should point to another template. The ```data``` variable will feed the template referenced in ```path```.
### Contains:
- [@organisms/by-author/rich-text](?p=organisms-rich-text)
### Used in
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/action-details](?p=organisms-action-details)
### Required Variables
~~~
actionSeqLists : [{
  title:
    type: string/required
  rteElements: [{
    path:
      type: string/required
    data:
      type: object/required
  }]
}]
~~~
