### Description
This is a variant of the [CalloutLink](./?p=molecules-callout-link) pattern showing an example styles with description text.

### How to generate
* assign text content to the `description` variable to true

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
}
~~~
