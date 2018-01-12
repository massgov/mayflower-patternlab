Description: This pattern shows a link with an optional logo image

### Status
* Stable as of 6.0.0

### Pattern Contains
* Decorative Link


### Variables
~~~
logoLink: {
  href:
    type: string / required
  text:
    type: string / required
  info:
    type: string (adds more description about the link) / optional
  image:
    type: optional
    src:
        type: string / required
    alt:
        type: string / required
}
~~~
