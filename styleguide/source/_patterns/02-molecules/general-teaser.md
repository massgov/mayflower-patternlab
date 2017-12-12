### Description
Short multi-use teaser with an optional image

### Status
* Stable as of TBA

### Pattern Contains
* Decorative Link
* Rich Text


### Variables
####These need to be updated! 
~~~

pressTeaser : {
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
