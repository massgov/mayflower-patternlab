### Description
Displays a set of links in a card layout.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Callout Link
* Cat Icon

### Variant options
* Can be used with [Callout Links](./?p=molecules-topical-card-with-callout-links)

### JavaScript Used
* This pattern uses JavaScript for the accordions shown on narrow screens (js/modules/accordions.js)

### Variables
~~~
topicalCard: {
  categoryIcon: { 
    type: categoryIcon / optional
  },
  title: {
    type: decorativeLink / required
  },
  subTitle: {
    type: boolean
  },
  description:
    type: string / optional
  type:
    type: string ("", "callout") / optional
  links: [{
    href:
      type: string / required
    text:
      type: string / required
    info:
      type: string (adds more description about the link) / optional
  }]
  seeAll: {
    type: decorativeLink / optional
  }
}
~~~
