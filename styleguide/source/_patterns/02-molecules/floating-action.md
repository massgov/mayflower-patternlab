---
title: Floating Action
---
Description: A floating action link/button.

## Status: ALPHA

### Used in:
- [@organisms/by-template/footer](?p=organisms-footer)

### Contains:
- [@atoms/01-buttons/button](?p=atoms-button) or [@atoms/01-buttons/button-link](?p=atoms-button-link)

### Required Variables
~~~
floatingAction: {
    alignment:
        type: "button"||"buttonLink"
        values: "left"||"right"
    button:
        @see: @atoms/01-buttons/button.md
}
~~~
