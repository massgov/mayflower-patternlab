---
title: DEPRECATED - Action activities
---
Description: An illustrated list where each item displays an image, title, description and a link to further information.
## State: DEPRECATED
### Notes
- The image is 190px wide with a variable height.
- This style is deprecated as it should be generalized for an illustrated list that can be used elsewhere in the site.
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/action-details](?p=organisms-action-details)
- [05-pages/LOC-Mt-Greylock-State-Park](?p=pages-LOC-Mt-Greylock-State-Park)
### Required Variables
~~~
actionActivities: [{
  image:
    type: string/url/required
  alt:
    type: string/required
  title:
    type: string/required
  description:
    type: string/required
}]
~~~

### Required Variables
~~~
actionActivities: [{
  linkTitle:
    type: string/optional
  href:
    type: string/url/optional
}]
~~~
