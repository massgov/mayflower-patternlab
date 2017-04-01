---
title: Section links
---
Description: displays a set of links in a card layout.
## Status: Alpha
### Notes:
- The way the icons are rendered is deprecated and will need to be updated here once refactored.

### Contains:
- [@atoms/05-icons/cat-icon](?p=atoms-cat-icon)
- Either:
  - [@atoms/decorative-link](?p=atoms-decorative-link)
  - [@molecules/callout-link](?p=molecules-callout-link)
  
### Variations:
- [Section Links with Callout Links](?p=molecules-section-links-with-callout-links)
- [Section Links with See All](?p=molecules-section-links-with-see-all)

### Used in:
- [@organisms/by-author/sections-three-up](?p=organisms-sections-three-up)

### Variables
~~~
sectionLinks: {
  catIcon: {
    icon:
      type: string/path to icon
    small:
      type: boolean/true
  },
  title: {
    href:
      type: url/required
    text:
      type: string/required
  },
  description:
    type: string
  type:
    type: string/optional ("callout" || defaults to "decorative")
  links: [{
    href:
      type: url/required
    text:
      type: string/required
  }]
  seeAll: {
    href:
      type: url
    text:
      type: string
  } / optional
}
~~~
