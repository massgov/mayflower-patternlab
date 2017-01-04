---
title: Figure
---
Description: an atom for `<figure>` elements with and image and caption elements along with an optional 'float' direction

## State: ALPHA

## Used In:
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@organisms/by-author/rich-text-description](/?p=organisms-rich-text-description)
- [@pages/GUIDE-movng-to-ma-part3](/?p=pages-GUIDE-movng-to-ma-part3)


### Variables
~~~
figure: {
  align: 
    type: string / optional - ('align-left', 'align-right'),
  image: {
    alt:
        type: string / required
    src:
        type: string (url) / required
    height:
        type: string
    width:
        type: string
  }
  caption: 
    type: string
}
~~~

### Variations
- [@atoms/09-media/figure](/?p=atoms-figure)
- [@atoms/09-media/figure-left](/?p=atoms-figure-left)
- [@atoms/09-media/figure-right](/?p=atoms-figure-right)
