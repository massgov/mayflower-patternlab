---
title: Link
---
Description: Displays an link with the "<a>" tag and class "ma__content-link". It can also optionally display a chevron.

## State: ALPHA
### Used In:
- [@molecules/action-gallery](/?p=molecules-action-gallery)
- [@molecules/header-contact](/?p=molecules-header-contact)
- [@organisms/by-author/helpful-links](/?p=organisms-helpful-links)
- [@organisms/by-author/sidebar-promo](/?p=organisms-sidebar-promo)
- [@organisms/by-template/header-alert](/?p=organisms-header-alert)
- [@organisms/by-template/image-credit](/?p=organisms-image-credit)

### Required Variables:
~~~
link {
    href:
        type: string/required
    text:
        type: string/required
    chevron:
        type: boolean
    map:
        type: boolean
}
~~~
