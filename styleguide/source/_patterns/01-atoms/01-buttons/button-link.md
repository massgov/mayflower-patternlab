---
title: Button Main Link
---
Description: A link `<a>` element which is styled to look like a main button.

## State: ALPHA
### Notes:
The button atoms are too similar to keep as separate files. This should be refactored to use one file, and one object that has href, text and type.

These CSS classes can also be applied to `<button>` elements when a link is not required.
### Used In:
### Variables:
~~~
buttonMain {
    href:
        type: string (url) / required
    text: 
        type: string / reuired
}
~~~
## Variations
* [Main](/?p=atoms-button-link)
* [Main Alt](/?p=atoms-button-link-alt)
* [Main Alt Small](/?p=atoms-button-link-alt-sm)
* [Minor](/?p=atoms-button-link2)
* [Minor Alt](/?p=atoms-button-link2-alt)
* [Minor Alt Small](/?p=atoms-button-link2-alt-sm)
* [Small](/?p=atoms-button-link-sm)
* [Search](/?p=atoms-button-search) (no variables required)
