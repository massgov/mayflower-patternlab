---
title: DEPRECATED - Action Event
---
Description: A singular event including title, link, date and a description of the event.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display an event's information anywhere in the site.
### Contains
- [@atoms/decorative-link.twig](?p=atoms-decorative-link)
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/sidebar-widget](?p=organisms-sidebar-widget)
### Required Variables
~~~
actionEvent: {
  name: {
    type:
      type: string/NULL or external
    href:
      type: string/url/required
    text:
      type: string/required
    property: 
      type: string/optional
  },
  date:
    type: date/required
  description:
    type: string
}
~~~
