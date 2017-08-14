### Description
Short teaser for a related press event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Rich Text


### Variables
~~~
pressTeaser : {
  image: {
    type: object/image/optional
  }
  eyebrow: 
    type: string / optional
  title : {
    type: decorativeLink / required
  },
  date: 
    type: string / optional,
  org: 
    type: string / optional,
  description: {
    type: richText / optional
  }
}
~~~
