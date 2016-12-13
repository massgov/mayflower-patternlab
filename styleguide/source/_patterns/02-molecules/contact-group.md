---
title: Contact group
---
Description: Displays a grouping of contact information under a header with an icon.
## Status: ALPHA
### Notes:
* Multiple contacts can be displayed under the one heading by adding multiple items.
* Most fields for the item are optional and will render differently based on the item.type used.
### Used in:
- [@molecules/contact-us](/?p=organisms-contact-us)
### Required Variables
~~~
contactGroup: {
    icon:
        directory/required
    name:
        string/required
    items: [{
        type:
            string (online, phone, email, address or other)
        label:
            string
        value:
            string
        link:
            string
        details:
            string
     }]
}
~~~