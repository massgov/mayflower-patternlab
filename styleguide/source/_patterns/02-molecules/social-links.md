---
title: Social links
---
Description: displays a list of sitewide social links
## Status: Alpha
### Notes:
- The links are currently hardcoded and do not have real urls.
- Since the only visual content for the link is an icon, the pattern provides visually hidden contextual (action oriented ) link text for assistive technology


### Used in:
- [@organisms/by-template/footer](?p=organisms-footer)

### Required Variables:
~~~
  socialLinks: {
    label:
      type: string/optional
    items: [{
      href: 
        type: string(url)/required,
      icon: 
        type: string(path to icon)/required
      altText:
        type: string/required
    }
  }]

~~~