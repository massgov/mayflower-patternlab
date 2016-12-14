---
title: Header tags
---
Description: a molecule for a set of taxonomy links in the header.
## Status: ALPHA
### Notes
Needs refactoring of variable structure. Should be simplified to be an array of tags that contain title, href.
### Used in:
- [@organisms/by-template/page-header](/?p=organisms-page-header)
### Required Variables
~~~
headerTags: {
  taxonomyTerms: [{
    url:
      string
    term:
      string
  }]
}
~~~
