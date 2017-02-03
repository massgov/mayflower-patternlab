---
title: Image Promo
---
Description: An illustrated list where each item displays an image, title, description and a link to further information.

## State: Alpha

### Notes
- The image is 190px wide with a variable height.

### Used in:
- [@molecules/action-activities](?p=molecules-action-activities)


### Required Variables
~~~
imagePromo: {
  title: {
    text: 
      type: string/required,
    href: 
      type: string(url)/optional
    type:
      type: string/optional ("external")
  } 
  (optional) image: {  
    image:
      type: string(path)/required
    text: 
      type: string/required - describes the image
    href: 
      type: string(url)/optional
  },
  description: {
    type: see [@organisms/by-author/rich-text](?p=organisms-rich-text) file
  },
  (optional) link: {
    type: see [@atoms/decorative-link](?p=atoms-decorative-link) file
  }
}
~~~

