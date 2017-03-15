---
title: Section links
---
Description: displays a set of links for topic or subtopic.
## Status: Alpha
### Notes:
- The way the icons are rendered is deprecrated and will need to be updated here once refactored.

### Contains:
- [@atoms/05-icons/cat-icon](?p=atoms-cat-icon)
- [@atoms/decorative-link](?p=atoms-decorative-link)

### Used in:
- [@organisms/by-author/sections-three-up](?p=organisms-sections-three-up)

### Required Variables
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
  links: [{
    href:
      type: url/required
    text:
      type: string/required
  }]
}
~~~
