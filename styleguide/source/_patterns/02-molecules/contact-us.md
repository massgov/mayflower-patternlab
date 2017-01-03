---
title: Contact Us
---
Description: `<section>` element which contains an `<h4>` title heading (an entity title) and several groups (or types IE phone, fax, email, address) of contact information.

## State: ALPHA

### Notes:
The first two contact groups should always be visible on page load.  Additional contact groups should be hidden within the accordion.

### Used In:

### Contains
[@molecules/contact-group](?p=molecules-contact-group)

### Variables:
~~~
contactUs: {
    title: {
        href:
            type: string (url) / optional
        target:
            type: string (_blank || "") / optional
        text:
            type: string / required
        chevron:
            type: string (boolean, "false") / required
    } / required
    groups: [
      ...
        contactGroup object instances, see @molecules/contact-group
      ...
    ] / required
}
~~~
