---
title: Decorative link
---
Description: an atom for a decorative link.
## State: BETA
### Notes
The svg reference could possibly change. 05-icons and 06-icons-location may still be consolodated.
### Used in:
- [@molecules/action-downloads](/?p=molecules-action-downloads)
- [@molecules/action-event](/?p=molecules-action-event)
- [@molecules/callout-link](/?p=molecules-callout-link)
- [@molecules/illustrated-link](/?p=molecules-illustrated-link)
- [@molecules/related-action](/?p=molecules-related-action)
- [@molecules/related-action](/?p=molecules-related-action)
- [@organisms/by-author/blog-feed](/?p=organisms-blog-feed)
- [@organisms/by-author/callout-alert](/?p=organisms-callout-alert)
- [@organisms/by-author/quick-actions](/?p=organisms-quick-actions)
- [@organisms/by-author/suggested-pages](/?p=organisms-suggested-pages)
- [@organisms/by-author/test-feed](/?p=organisms-test-feed)
### Required Variables
~~~
decorativeLink {
    href:
        type: string/required
    text:
        type: string/required
    type:
        type: string/optional ("external")
    info:
        type: string/optional
        type: string
    property:
        type: string/optional
}
~~~
