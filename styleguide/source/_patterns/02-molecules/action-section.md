---
title: DEPRECATED - Action Section
---
Description: A section of content on an action page that includes a title and multiple types of content.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display anywhere in the site.
- The action section defines the type of content it displays via the ```path``` variable it should point to another template. The ```data``` variable will feed the template referenced in ```path```.
### Contains:
- [@atoms/04-headings/comp-heading](?p=atoms-comp-heading)
### Used in
- [@organisms/by-author/action-section](?p=organisms-action-section)
### Required Variables
~~~
actionSection: {
  title:
    type: string
  id:
    type: string
  path:
    type: string/template name/required
  data:
    type: object/contains object for referenced template/required
}
~~~
