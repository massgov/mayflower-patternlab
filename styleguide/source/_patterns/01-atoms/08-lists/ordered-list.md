---
title: Ordered List
---
Description: An `<ol>`  element with its child `<li>` elements and optional nested child `<ol>` and `<li>` elements.

## State: ALPHA

### Notes:

### Used In:

### Required Variables:
~~~
orderedList [
    { text:
        type: string / required
    }, / required (at least 1)
    { text: (same as above, with optional nested list array)
        sublist [
            { text:
                type: string / required
            } / required (at least 1, only when nestedList exists)
        ]
    },
]
~~~
