### Description
This pattern shows a grid containing a combination of Callout links and Illustrated Links beneath an optional title

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading atom (optional)
* Sidebar Heading atom (optional)
* Callout Link molecule
* Illustrated Link molecule (optional)

### Variant options
* Can be rendered with the title [visually hidden](./?p=organisms-key-actions-with-hidden-heading) to provide context for screen readers.

### Variables
~~~
keyActions: {
  id: 
    type: string (unique per page) / optional
  hiddenHeading: 
    type: boolean
  compHeading: {
    type: compHeading / optional 
  },
  links:[{
    type: array of Callout Links or Illustrated Links / required
  }]
}
~~~
