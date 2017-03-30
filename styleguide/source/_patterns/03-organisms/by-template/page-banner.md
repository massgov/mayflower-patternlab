---
Title: Page Banner
---
Description: Page Header with title, icon and background used at the top of a page.

## Status: ALPHA

### Used in:
- [@pages\L1-state-parks-and-recreation](/?p=pages-L1-state-parks-and-recreation)
- [@pages/L0-visiting-and-exploring](/?p=pages-L0-visiting-and-exploring)
- [@pages/ORG-Health-Services](/?p=pages-ORG-Health-Services)


### Required Variables
~~~
pageBanner: {
  bgWide:
    type: string/required (path to image for wide screens)
  bgNarrow:
    type: string/required (path to image for narrow screens)
  size:
    type: string(optional) ('small', 'large', 'overlay')
  icon:
    type: string/optional (path to icon file),
  title:
    type: string/required
  titleSubText:
    type: string/optional
  description:
    type: string/optional
  color: 
    type: string/optional (null, 'blue') 
}
~~~
