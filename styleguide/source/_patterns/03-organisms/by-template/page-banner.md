Description: Full width banner image shown behind a wedge shaped overlay containing a title and an optional description or icon.

### Status
* Stable as of 5.0.0

### Variant options
* This pattern can be adjusted to display as four other layouts, in addition to the default, by setting the size variable to ['small'](./?p=organisms-page-banner-as-small), ['large'](./?p=organisms-page-banner-as-large), ['overlay'](./?p=organisms-page-banner-as-overlay), and ['columns'](./?p=organisms-page-banner-as-columns).
* This pattern and it's layout variants can be viewed in an optional blue color by setting the color variable to ['blue'](./?p=organisms-page-banner-as-blue)
* The icon and description are both optional

### Variables
~~~
pageBanner: {
  bgWide:
    type: string/required (path to image for wide screens)
  bgNarrow:
    type: string/required (path to image for narrow screens)
  size:
    type: string(optional) (null, 'small', 'medium', 'large', 'overlay', 'columns')
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
