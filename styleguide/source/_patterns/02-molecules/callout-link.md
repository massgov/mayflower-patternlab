Description: This pattern shows a link styled as a card

### Status
* Stable as of 6.0.0

### Pattern Contains
* SVG Arrow atom

### Variant options
* With [description](./?p=molecules-callout-link-as-description) text.
* As [card](./?p=molecules-callout-link-as-card) with the theme set to `card`, and a string supplied to eyebrow, details, and source.

### Variables
~~~
calloutLink: {
  href:
    type: string / required
  text:
    type: string / required
  info:
    type: string (adds more description about the link) / optional
  description:
    type: string (adds a short description under the title text) / optional
  theme:
    type: string ("null" or "card") / optional
  eyebrow:
  	type: string / optional
  source:
  	type: string / optional
  details:
  	type: string / optional
}
~~~
