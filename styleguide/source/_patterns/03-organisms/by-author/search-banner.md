### Description
This pattern shows an image banner with large search input as the focus followed by some helpful links.

### Status
* Beta as of 5.0.0

### Pattern Contains
* Input Text
* Search Banner Form
* Link List

### Usage Guidelines
* The Search Banner Form is the only pattern that should be included by the `searchBanner.form` object.
  * {% include form.path with form.content %}

### Variables
~~~
searchBanner: {
  bgWide: 
    type: string (image path) / required
  bgNarrow: 
    type: string (image path) / required
  imageName: 
    type: string / optional
  imageAuthor: 
    type: string / optional
  title: 
    type: string / required
  intro: 
    type: string / required
  form: {
    path:
      type: string / required
    content: {
      type: object / required
    }
  }
  linkList: {
    type: linkList / required
  }
}
~~~
