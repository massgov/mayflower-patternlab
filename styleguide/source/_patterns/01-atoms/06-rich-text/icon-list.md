---
title: Icon List
---
Description: An `<ul>` element with its child `<li>` elements that is displayed with a custom icon bullet in a Rich text editor.  An optional nested child `<ul>` and `<li>` elements is allowed.

## State: Alpha

### Notes:

### Used In:
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)

### Required Variables:
~~~
iconList [
  { text:
    type: string / required
    sublist (optional) [
      { text:
        type: string / required
      }
    ]
  },
]
~~~
