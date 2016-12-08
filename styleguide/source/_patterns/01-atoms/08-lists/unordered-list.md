---
title: Unordered List
---
Description: An `<ul>`  element with its child `<li>` elements and optional nested child `<ul>` and `<li>` elements.

## State: ALPHA

### Notes:

### Used In:

### Required Variables:
~~~
unorderedList [
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
