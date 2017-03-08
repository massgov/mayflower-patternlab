---
title: Illustrated link
---
Description: a molecule for an illustrated link.
## Status: ALPHA
### Used in:
- [@organisms/by-author/action-finder](/?p=organisms-action-finder)
- [@organisms/by-author/suggested-pages](/?p=organisms-suggested-pages)
### Required Variables
~~~
illustratedLink {
  text:
    type: string / required
  href:
    type: string / required
  type:
    type: string / ('', or 'external')
  image:
    type: string (path) / optional
  label:
    type: string / optional
}
~~~