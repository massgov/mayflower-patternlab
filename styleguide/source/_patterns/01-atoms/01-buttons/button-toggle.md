---
title: Button Toggle
---
Description: Two link `<a>` elements which toggle between two values.

## State: New as of 5.14.0

### Variables:
~~~
buttonToggle {
  options: [{
    value:
      type: string / required
    text:
      type: string / required
  }]
  href:
    type: string (url) / required
  info:
    type: string / optional
  size:
    type: string / optional ("" or "small")
  theme:
    type: string / optional ("" or "alt")
  outline:
    type: boolean
}
~~~
