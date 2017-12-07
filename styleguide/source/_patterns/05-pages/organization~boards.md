### Description
This is an example of a Mass.gov Organization page variant that demonstrates an additional "Board Members" section. The page uses a stacked row template.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header
* Footer
* Stacked Row (template)
* Page Header - location
* Page Banner - large
* Rich Text
* Board Members (variant of press-listing-as-grid organism)
* Icon Links
* Action Finder
* Mapped Locations
* Section Three Up
* Link List


### Variables
See Patterns above
~~~
pageBanner: {
  type: pageBanner / required
},

pageHeader: {
  type: pageHeader / required
},

stackedRowSections: [{
  type: array of stackedRowSections / required
}]
~~~
