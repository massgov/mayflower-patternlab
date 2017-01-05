
---
Title: Action Header
---
Description: Page Header with multiple sub-modules used at the top of a page.

## Status: ALPHA


### Used in:
- [@pages\LOC-Mt-Greylock-State-Park](/?p=pages-LOC-Mt-Greylock-State-Park)
- [@pages/LOC-Southbridge-RMV](/?p=pages-LOC-Southbridge-RMV)
- [@pages/ORG-Health-Services](/?p=pages-ORG-Health-Services)


### Contains:
- [@organisms/by-template/page-banner.twig](/?p=organisms-page-banner)
- [@organisms/by-template/page-header.twig](/?p=organisms-page-header)
- [@molecules/header-contact.twig](/?p=molecules-header-contact)


### Required Variables
- See sub modules listed above for more details

~~~
pageBanner:
  type: object/optional

pageHeader:
  type: object/required

headerContact: 
  type: object/required

actionHeader:
  divider: 
    type: boolean
  widgets:
    type: array/optional (used to populate the right rail in Pattern Lab)
~~~





