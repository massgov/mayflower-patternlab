### Description
This Pattern describes the requirements needed to complete a form page

### Status
* Stable as of 5.0.0

### Pattern Contains
* Content Heading
* Rich Text
* Labelled Icons

### Variant options
* When added to a [Right Rail](./?p=organisms-form-requirements-in-two-colmun) template the background color bleeds out to the left.

### Variables
~~~
formRequirements: {
  rteTitle: {
    type: contentHeading / optional
  },

  richText: {
    type: richText / required
  },

  payment: (optional) {
    title: {
      type: contentHeading / required
    },

    labelledIcons: {
      type: labelledIcons / required
    }
  }
}
~~~
