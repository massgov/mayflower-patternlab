### Description
This Pattern shows an expandable table of contents which can contain simple links, download links, or expandable sections.

### Status
* Stable as of 5.11.0

### Pattern Contains
* Decorated Link
* Download Link
* Expandable Section

### Usage Guidelines
* This is meant to be used to contain a mix of links, download links, or section titles with child links/download links within accordions.

### Variables
~~~
tableOfContentsHierarchy: {
  coloredHeading: {
    type: coloredHeading / required
  },
  sections: [{
    type: mixedTypes...
        downloadLink
        or
        decorativeLink
        or
        {
            text: string / required,
            linkItems: [{
                type: decorativeLink or downloadLink
            }]
        }
  }]

}
~~~
