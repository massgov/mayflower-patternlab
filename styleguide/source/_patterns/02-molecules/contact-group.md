---
title: Contact Group
---
Description: A list of a specific type of contact information for an entity wrapped in a container, described by a title and optional icon.

## State: ALPHA
### Notes:
Multiple contact groups are often aggregated into an array, used by Contact Us molecule.

### Used In:
[@molecules/contact-us](?p=molecules-contact-us)

### Contains


### Variables:
~~~
group: { // aggregated in array contactUs.contactGroups
    icon:
        type: string (include path to icon twig template) / optional
    name:
        type: string ("Phone" || "Online" || "Address" || "Fax") / optional
    items: [
      ...,
        {
            type: 
                type: string ("phone" || "online" || "address" || "fax" ) / required,
            label:
                type: string / optional
            value:
                type: string (html allowed) / required
            link:
                type: string / optional
            details: 
                type: string / optional
        },
      ...
    ] / required
}
~~~
