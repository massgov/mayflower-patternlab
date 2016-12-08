---
title: Category Icon
---
Description: An `<figure>` element which contains an icon atom (`<svg>` element) used as the category icon on a topic page section links list. Can optionally be indicated as small using `catIcon.small`

## State: ALPHA

### Notes:
This template currently hard codes the include for `@atoms/07-user-added-icons/svg-camping.twig` and should be refactored to use the existing variable `catIcon.svg`.  

### Used In:
- [@molecules/section-links](/?p=molecules-section-links)

### Contains:
- [@atoms/07-user-added-icons/svg-camping](/?p=atoms-svg-camping)

### Variables:
~~~
catIcon: {
    svg:
        type: string / required 
        (any existing icon filename without the ".svg" extension)
    small:
        type: string ("true" || "")
  }
~~~
