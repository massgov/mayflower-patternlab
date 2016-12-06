---
title: Header tags
---
Description: a molecule for a set of taxonomy links in the header.
## Status: Alpha
### Used in:
* 03-organisms/by-template/page-header.twig
### Required Variables
~~~
headerTags -> taxonomTerms
taxonomyTerms = array({term, url}, {term, url})
~~~
### Notes
Needs refactoring of variable structure. Should be simplified to be an array of tags that contain title, href.