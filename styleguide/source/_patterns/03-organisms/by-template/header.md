### Description
This is a pattern for the site header.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Utility Nav
* Site Logo
* Header Search
* Main Nav

### JavaScript Used
* Header Search (js/modules/mobileNav.js) 
* Scrolling Nav (js/modules/scrollAnchors.js)
* Utility Nav (js/modules/utilNav.js)
* Main Nav (js/modules/mainNav.js)

### Variables
~~~
utilityNav: {
  type: utilityNav / required
}
headerSearch : {
  type: headerSearch / required
}
mainNav: [{
  type: mainNav / required
}]
~~~
