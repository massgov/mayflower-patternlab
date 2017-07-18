
---
Title: Page Header
---
Description: Page Header with multiple spots (see optional content + widgets properties below) to add sub-modules for additional content.

## Status: ALPHA

### Used in:
- [@pages/LOC-Mt-Greylock-State-Park](/?p=pages-LOC-Mt-Greylock-State-Park)
- [@pages/LOC-Southbridge-RMV](/?p=pages-LOC-Southbridge-RMV)
- [@pages/ORG-Health-Services](/?p=pages-ORG-Health-Services)
- [@pages/HOWTO-unemployment](/?p=pages-HOWTO-unemployment)


### Contains:
- [@molecules/header-tags.twig](/?p=molecules-header-tags)
- [@molecules/header-contact.twig](/?p=molecules-header-contact)
- [@atoms/11-text/publish-state.twig](/?p=atoms-publish-state)


### Required Variables
- See sub modules listed above for more details

~~~
pageHeader:
  divider: 
    type: boolean
  prefix:
    type: string / optional
  title:
    type: string
  subTitle:
    type: string
  headerTags:
    type: see @molecules/header-tags
  publishState:
    type: object / optional
      text: 
        type: string/required   
  optionalContents:
    type: array / optional (used to populate header main column under subTitle)
    path:
      type: string / path/to/pattern
    data:
      type: object / see/submodules
  widgets:
    type: array/optional (used to populate the right rail in Pattern Lab)
    path:
      type: string / path/to/pattern
    data:
      type: object / see/submodules
~~~
