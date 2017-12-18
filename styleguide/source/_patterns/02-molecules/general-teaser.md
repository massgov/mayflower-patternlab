### Description
Short multi-use teaser with an optional image. This pattern can display the photo and details either stacked, with the 
image on top, or side by side with the image to the left of the details.

### Status
* Stable as of TBA

### Pattern Contains
* Decorative Link
* Rich Text


### Variables
~~~

generalTeaser : {
  stacked:
     type: boolean / optional
  image: (optional) {
    src:
      type: string (image path) / required
    alt: 
      type: string (imgage description) / required
  }
  eyebrow: 
    type: string / optional
  title : {
    type: decorativeLink / required
  },
  level:
    type: number / optional
  date: 
    type: string / optional,
  org: 
    type: string / optional,
  description: {
    type: richText / optional
  }
}
~~~
