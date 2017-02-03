---
title: Social links
---
Description: displays a list of sitewide social links
## Status: Alpha
### Notes:
- The links are currently hardcoded and do not have real urls.


### Used in:
- [@organisms/by-template/footer](?p=organisms-footer)

### Required Variables:
~~~
  socialLinks: {
    items: [{
      href: 
        type: string(url)/required,
      icon: 
        type: string(path to icon)/required
    }
  }]

~~~