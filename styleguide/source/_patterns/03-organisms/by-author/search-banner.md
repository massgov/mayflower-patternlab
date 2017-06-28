---
title: Search Banner
---
Description: Banner component with large Search Input as the focus.
## State: ALPHA

###  Notes
The form is setup to accept a fully rendered variable or to use the search-banner-form molecule if the system that is implementing the form can provide individual fofm parts.

### Used in: 
[@pages/homepage.twig](/?p=pages-Homepage)

### Contains
* [@atoms/03-forms/input-text.twig](/?p=atoms-input-text)
* [@atoms/05-icons/svg-search.twig](/?p=atoms-svg-search)
* [@molecules/search-banner-form.twig](/?p=molecules-search-banner-form)
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
  form: {
    path:
      type: string
    content: {
      action:
        type: string / required
      buttonText:
        type: string / required
      inputText: {
        type: object / inputText / required
      }
    }
  }
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