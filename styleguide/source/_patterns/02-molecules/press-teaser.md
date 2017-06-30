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
  image: (optional)
  image {
    alt:
      type: string / required
    src:
      type: string (url) / required
    height:
      type: string
    width:
      type: string
    href: 
      type: string/url/optional
  }
  eyebrow: 
    type: string/optional
  title : {
    type: object/decorativeLink/required
  },
  date: 
    type: string/optional,
  org: 
    type: string/optional,
  description: {
    type: object/richText/optional
  }
}

~~~
