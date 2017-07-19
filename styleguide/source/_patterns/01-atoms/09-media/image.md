---
title: Image
---

### Description
Displays an image using the image HTML element

### Status
* Stable as of 1.0.0

### Usage Guidelines
* Use this pattern any where you wish to include an image
* Make sure the height and width values match the image's height and width
* Avoid using CSS to stretch the image beyond it's height and width or to change it's aspect ratio

### Variables
~~~
image {
  alt:
    type: string / required
  src:
    type: string (url) / required
  height:
    type: string / required
  width:
    type: string / required
}
~~~


