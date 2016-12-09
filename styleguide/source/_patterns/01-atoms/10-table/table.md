---
title: Table
---
Description: an atom for `<table>` elements with child `<thead>`, `<tbody>`, `<tr>`, and `<td>` elements.

## State: ALPHA

## Used In:
- [@organisms/by-author/rich-text](/?p=organisms-rich-text)
- [@organisms/by-author/rich-text-description](/?p=organisms-rich-text-description)

## Notes:

### Variables
~~~
table {
    head {
        rows [
            {
                rowSpanOffset:
                    type: string (number)
                cells [
                    heading:
                        type: string ("true" || "false") / required
                    colspan:
                        type: string (number)
                    rowspan:
                        type: string (number)
                    text:
                        type: string / required
                ], / required (at least 1)
            }, / required (at least 1)
        ] / required
    } / required
    bodies [
        rows [
            rowSpanOffset:
                type: string (number)
            cells [
                heading:
                    type: string ("true" || "false") / required
                colspan:
                    type: string (number)
                rowspan:
                    type: string (number)
                text:
                    type: string / required
            ], / required (at least 1)
        ] / required (at least 1)
    ] / required (at least 1)
}
~~~
