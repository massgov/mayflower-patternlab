---
title: Section links with Callout Links
---
Description: displays a set of callout links in a card layout.

### Base:
- [Section Links](?p=molecules-section-links)

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
    type: string/required ("callout")
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
