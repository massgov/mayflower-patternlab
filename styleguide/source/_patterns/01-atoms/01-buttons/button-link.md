---
title: Button Link
---
Description: A link `<a>` element which is styled to look like a button.

## State: ALPHA

### Notes:
- 'theme' eventually needs to be changed to 'color' and used as a modifier class (--color)

### Used In:

### Variables:
~~~
buttonLink {
  text: 
    type: string / required
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
