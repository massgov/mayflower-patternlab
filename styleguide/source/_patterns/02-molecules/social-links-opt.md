### Description
Displays a list of social links for sharing a page with an optional label

### Status
* Stable as of 5.0.0


### Variables
~~~
socialLinks: {
  label:
    type: string / optional
  items: [{
    href: 
      type: string(url) / required,
    icon: 
      type: string(icon name for path and id) / required
    altText:
      type: string / required for accessibilty
  }
}]
~~~
