---
Title: Contact Us
---

Description: Displays groups of contact information.

## State: Alpha

### Contains:
- [@molecules/contact-group](/?p=organisms-contact-group)

### Used in:
- [@organisms/by-author/sidebar-contact](/?p=organisms-sidebar-contact)

## Notes:
- First two contact groups should always be visible on page load.  Additional contact groups should be hidden within the accordion.
- `{{ accordion }}` is a local twig variable which is set in the molecule twig template when looping through contactUs.groups and hidden is set.

### Required Variables
~~~
contactUs {
    title {
        href:
            string
        chevron:
            string
        text:
            string/required
    }
    groups [{
      icon:
           type: string/required
      name:
           type: string/required
      hidden:
           type: boolean
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
   ]}
}