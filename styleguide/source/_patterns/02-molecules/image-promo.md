---
title: Image Promo
---
Description: An illustrated list where each item displays an image, title, description and a link to further information.

## State: Alpha

### Notes
- The image is 190px wide with a variable height.
- Set location.map to true to create a JS link to interact with a google map.

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
  image: (optional) {  
    src:
      type: string(path)/required
    alt: 
      type: string/required - describes the image
    href: 
      type: string(url)/optional
  },
  description: {
    type: see [@organisms/by-author/rich-text](?p=organisms-rich-text) file
  },
  link: (optional) {
    type: see [@atoms/decorative-link](?p=atoms-decorative-link) file
  },
  location (optional) : {
    text: 
      type: string/optional
    map:
      type: boolean
  }
  phone (optional) {
    text: 
      type: string/required
  }
}
~~~

