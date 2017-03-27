---
title: DEPRECATED - Unordered List
---
Description: An `<ul>`  element with its child `<li>` elements and optional nested child `<ul>` and `<li>` elements.

## State: DEPRECATED

### Notes:
All base elements with no class or id are being moved into base pattern directory.

### Used In:
- [@molecules/action-step](/?p=molecules-action-step)
- [@organisms/by-author/steps-unordered](/?p=organisms-steps-unordered)
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@pages/GUIDE-movng-to-ma-part1](/?p=pages-GUIDE-movng-to-ma-part1)
- [@pages/GUIDE-movng-to-ma-part2](/?p=pages-GUIDE-movng-to-ma-part2)
- [@pages/GUIDE-movng-to-ma-part3](/?p=pages-GUIDE-movng-to-ma-part3)

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
