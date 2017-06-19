---
title: Button
---
Description: A `<button>` element styled solid or outline and regular or small size

## State: ALPHA

### Notes:
- 'theme' eventually needs to be changed to 'color' and used as a modifier class (--color)

### Used In:

### Variables:
~~~
buttonMain {
  text: 
    type: string / required
  type:
    type: string / optional (ex: "button", "submit")
  size:
    type: string / optional ("" or "small")
  theme:
    type: string / optional ("" or "alt")
  outline: 
    type: boolean
}
~~~
