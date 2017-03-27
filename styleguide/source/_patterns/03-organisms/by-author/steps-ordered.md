---
title: DEPRECATED - Action Sequential List
---
Description: A section of content on an action page that includes a title and multiple types of content.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display anywhere in the site.
- The action section renders it's content using a rich text element. More information on how to setup a RTE can be found here: [@organisms/by-author/rich-text](?p=organisms-rich-text)
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
  richText: 
    type: see rich text pattern @organisms/by-author/rich-text
  }]
}]
~~~
