---
title: Org Selector
---

Description: Selectbox input that when changed shows/updates/hides a brief description of an organization.  The description of the organization is rendered using a Handlebar template orgInfo.html

## State: Alpha

### Required variables
~~~
orgSelector: {
  selectBox:{
    type: object/selectBox/required
  },

  organizations: [{
    value: 
      type: string/required - matches the value used in the selectBox
    image: {
      href: #,
        type: string/url/required 
      alt: 
        type: string/required,
      src: 
        type: string/url/required,
      height: 
        type: string/required,
      width: 
        type: string/required
    },
    name: {
      text: 
        type: string/required,
      href:
        type: string/url/required
    },
    jobTitle: 
      type: string/required,
    message: 
      type: rich text/required,
    moreLink: {
      text: 
        type: string/required,
      href: 
        type: string/url/required,
      info: 
        type: string/optional ('')
    }
  }]
}
~~~
