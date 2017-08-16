### Description
This pattern displays a link to the previous or next page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Arrow Button

### Variant options
* This can also be view as a [next](./?p=molecules-arrow-nav-as-next-page) page navigation

### Variables
~~~
arrowNav: {
  arrowButton: {
    type: arrowButton / required
  },
  title: 
    type: string / required
  link: {
    href: 
      type: string (url) / required
    text: 
      type: string / required
    info: 
      type: string (adds more description to the link) / optional
  }
}
~~~
