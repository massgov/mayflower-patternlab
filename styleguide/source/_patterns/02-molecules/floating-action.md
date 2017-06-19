---
title: Floating Action
---
Description: A floating action link/button.

## Status: ALPHA

### Used in:
- [@organisms/by-template/footer](?p=organisms-footer)

### Contains:


### Required Variables
~~~
floatingAction: {
    alignment:
        type: string
        values: "left"||"right"
    href: 
        type: string / URL
    text: 
        type: string,
        description: link text
    color: 
        type: string
        values: "green"
        description: color skin for the button/link
    outline:
        type: boolean
        description: whether or not to use the "minor" modifier
        @see: @atoms/buttons/button.md
}
~~~
