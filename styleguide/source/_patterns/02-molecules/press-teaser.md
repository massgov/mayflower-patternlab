---
title: Press Teaser
---
Description: Short teaser for a related press event

## State: Alpha

### Notes


### Contains
- [@organisms/by-author/rich-text](?p=organisms-rich-text)
- [@atoms/decorative-link](?p=atoms-decorative-link)

### Used in:


### Required Variables

~~~
pressTeaser : {
  image: {
    type: object/image/optional
  }
  eyebrow: 
    type: string/optional
  title : {
    type: object/decorativeLink/required
  },
  level: 
    type: integer/optional,  
  date: 
    type: string/optional,
  org: 
    type: string/optional,
  description: {
    type: object/richText/optional
  }
}

~~~
