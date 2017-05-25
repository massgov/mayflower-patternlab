---
title: Comp Heading
---
Description: An `<h2>` or `<h3>` element with a styled underline color designated by its CSS class.

## State: ALPHA

### Notes:


### Used In:
- [@molecules/action-section](/?p=molecules-action-section)
- [@organisms/by-author/key-actions](/?p=organisms-key-actions)
- [@organisms/by-author/helpful-links](/?p=organisms-helpful-links)
- [@organisms/by-author/form-download](/?p=organisms-form-download)
- [@organisms/by-author/multi-row-section](/?p=organisms-multi-row-section)

### Variables:
~~~
compHeading: {
  title:
    type: string / required
  sub:
    type: string ("true" || "" )
  color:
    type: string ("yellow")
  id:
    type: string
  centered:
    type: boolean
}
~~~

### Variations
- [@atoms/04-headings/comp-heading](/?p=atoms-comp-heading)
- [@atoms/04-headings/comp-heading-subheading](/?p=atoms-comp-heading-subheading)
- [@atoms/04-headings/comp-heading-yellow](/?p=atoms-comp-heading-yellow)
- [@atoms/04-headings/comp-heading-centered](/?p=atoms-comp-heading-centered)
