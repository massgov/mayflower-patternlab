---
title: Action Step
---
Description: Displays details about how to complete a step.

## Status: alpha

### Notes:

### Contains
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@molecules/download-link](/?p=molecules-download-link)
- [@atoms/decorative-link](/?p=atoms-decorative-link)

### Used in:
- [@organisms/by-author/steps-unordered](/?p=organisms-steps-unordered)

### Variables
~~~
actionStep: {
  accordion: 
    type: boolean
  isExpanded
    type: boolean
  accordionLabel: 
    type: string/required if accordion is true
  icon: 
    type: string/path/optional
  title: 
    type: string/required
  level: 
    type: integer / required
  richText: 
    type: object/required @organisms/by-author/rich-text.twig
  downloadLinks: 
    type: array/optional
    downloadLink: 
      type: object/required @molecules/download-link.twig
  decorativeLink: 
    type: object/optional @atoms/decorative-link.twig
}
~~~
