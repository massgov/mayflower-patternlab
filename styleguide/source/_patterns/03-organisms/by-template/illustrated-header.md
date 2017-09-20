### Description
This is displays a Page Header pattern with an optional image off to the right

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header

### Variant options
* If the image isn't used a [green](./?p=organisms-illustrated-header-colored) background is shown in it's place.


### Variables
~~~
illustratedHeader: {
  bgInfo: 
    type: string / optional (required with image)
  bgImage: 
    type: string (image path) / optional
  category: 
    type: string / required,
  pageHeader: {
    type: pageHeader / required
  }
}
~~~
