---
title: Search Banner
---
Description: Banner component with large Search Input as the focus.
## State: ALPHA

###  Notes

### Used in: 
[@pages/homepage.twig](/?p=pages-Homepage)

### Contains
* [@atoms/03-forms/input-text.twig](/?p=atoms-input-text)
* [@atoms/05-icons/svg-search.twig](/?p=atoms-svg-search)
* [@organisms/by-author/helpful-links.twig](/?p=organisms-helpful-links)

### Variables 
~~~ 
searchBanner: {
  bgWide: 
    type: string/path/required
  bgNarrow: 
    type: string/path/required
  imageName: 
    type: string/optional
  imageAuthor: 
    type: string/optional
  title: 
    type: string/required
  intro: 
    type: string/required
  buttonText:
    type: string/required
  inputText: {
    labelText: 
      type: string/required
    required: 
      type: boolean,
    id: 
      type: string/unique id/required
    placeholder: 
      type: string/optional
  },
  helpfulLinks: {
    columns: 
      type: string/optional ('true','')
    compHeading: {
      title: 
        type: string/required
      sub: 
        type: string/optional ('true',''),
      color: 
        type: string/optional ('yellow',''),
      centered: true
    },
    items: [{
      href:
        type: string/url/required
      text:
        type: string/required
      chevron: 
        type: string/optional ('true':'')
    }]
  }
}
~~~