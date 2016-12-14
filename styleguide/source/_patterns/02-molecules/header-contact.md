---
title: Header contact
---
Description: Displays a set of contact information in the header.

## State: Alpha

### Contains:
- [@molecules/contact-group](/?p=organisms-contact-group)

### Used in:
- [@organisms/by-author/sidebar-contact](/?p=organisms-sidebar-contact)

## Notes:
- This is similar to the [@molecules/contact-us](/?p=organisms-contact-us) but different in several key areas. This may be refactored to one set of contact templates.
- `{{ accordion }}, {{ accordionParent }}, {{ accordionContent }}` are a set of local twig variables which is set in the molecule if phone, online and fax is set.

### Required Variables
~~~
headerContact {
  title:
    type: string/required
  address1:
    type: string/required
  address2:
    type: string/required
  city:
    type: string/required
  state:
    type: string/required
  zip:
    type: string/required
  directions {
    href:
      type: url/string/required
    target:
      type: default '_blank'/required
    text:
      type: default 'Directions'/required
    chevron:
      type: boolean
  },
  phone {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: formatted string
      rawVal:
        type: string
      details:
        type: string
    }]
  },
  online: {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: string
      details:
        type: string
    }]
  },
  fax: {
    icon:
      type: string
    name:
      type: string
    items: [{
      type:
        type: string
      label:
        type: string
      value:
        type: string
      details:
        type: string
    }]
  }
}
~~~
