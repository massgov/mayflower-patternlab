---
title: Section links with See All Link
---
Description: displays a set of links in a card layout with a "more" link at the bottom.

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
