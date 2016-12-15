---
title: Main nav
---
Description: The main navigation for the site.
## State: BETA
### Required variables
~~~
mainNav: [{
  href:
    type: url/required
  text:
    type: string/required
  active:
    type: boolean
  subNav:[{
    href:
      type: url/required
    text:
      type: string/required
  }]
}]
~~~
