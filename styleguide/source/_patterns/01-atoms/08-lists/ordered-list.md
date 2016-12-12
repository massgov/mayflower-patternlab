---
title: DEPRECATED - Ordered List
---
Description: An `<ol>`  element with its child `<li>` elements and optional nested child `<ol>` and `<li>` elements.

## State: DEPRECATED

### Notes:
All base elements with no class or id are being moved into base pattern directory.

### Used In:
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@organisms/by-author/rich-text-description](/?p=organisms-rich-text-description)

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
