---
title: Image - Pull Left
---
Description: an atom for `<image>` elements with alt text and 'pull' (float) left direction.

## State: ALPHA

## Used In:
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@organisms/by-author/rich-text-description](/?p=organisms-rich-text-description)
- [@organisms/by-author/sidebar-promo](/?p=organisms-sidebar-promo)
- [@pages/GUIDE-movng-to-ma-part3](/?p=pages-GUIDE-movng-to-ma-part3)

## Notes:
- `{{ class }}` is a local twig variable which is set in the atom twig template by appending `image.pull` to a CSS class name

### Variables
~~~
image {
    alt:
        type: string / required
    src:
        type: string (url) / required
    pull:
        type: string ("left") / required
}
~~~

### Variations
- [@atoms/09-media/image](/?p=atoms-image)
- [@atoms/09-media/image-left](/?p=atoms-image-left)
- [@atoms/09-media/image-right](/?p=atoms-image-right)
