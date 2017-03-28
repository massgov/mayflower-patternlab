---
title: Contact Us
---
Description: Displays Contact information to the user.

## State: Alpha

### Notes:
- This component can be viewed as an accordion or in list view
- in List view, the first two contact groups should be visible and the remainder are collapsed.

### Used In:
[@organism/by-template/action-header](?p=organism-action-header)

### Contains
[@molecules/contact-group](?p=molecules-contact-group)
[@atoms/04-headings/comp-heading](?p=atoms-comp-heading)
[@atoms/04-headings/column-heading](?p=atoms-column-heading)

### Variables:
~~~
contactUs: {
    accordion: 
        type: boolean
    isExpanded:
        type: boolean

    compHeading: {
        type: object/optional - see @atoms/04-headings/comp-heading.md
    }

    subTitle: {
        type: object/optional - see @atoms/04-headings/column-heading.md
    }

    groups: [{
        type: array of objects/required see @molecules/contact-group.md
    }]
}
~~~
