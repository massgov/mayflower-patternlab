---
title: Category Icon
---
Description: An `<figure>` element which contains an icon atom (`<svg>` element) used as the category icon on a topic page section links list. Can optionally be indicated as small using `catIcon.small`

## State: ALPHA

### Used In:
- [@molecules/section-links](/?p=molecules-section-links)

### Contains:
- Any supplied icon atom, such as:
[@atoms/05-icons/svg-lg-picnic-table](/?p=atoms-svg-lg-picnic-table)

### Variables:
~~~
catIcon: {
    icon:
        type: string / required 
        (a complete path to an icon atom twig template, such as "@atoms/05-icons/svg-picnic-table.twig")
    small:
        type: string ("true" || "")
  }
~~~
