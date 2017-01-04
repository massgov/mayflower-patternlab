---
title: Icon Links
---
Description: A list of links with corresponding icon.

## State: ALPHA
### Notes:
The way icons are referenced will change and require an update here as well.
### Variables:
~~~
sidebarHeading: {
  title:
    text: 
      type: string / required
}
iconLinks: {
  items: [{
    icon:
      type: string (path to icon) / required
    link: {
      href:
        type: string (url) / required
      text:
        type: string / required
      chevron:
        type: string / required
    }
  }]
}
~~~
