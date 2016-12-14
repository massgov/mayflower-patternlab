---
title: Action Downloads
---
Description: A list of downloadable assets with an icon to display the type of file being downloaded.
## State: Alpha
### Notes
- The download link can be an external link to an online form if the format of "form" is used for the actionDownload item.
- This style has the potential to be generalized for a list of downloadable items used elsewhere in the site.
### Contains
- [@atoms/decorative-link.twig](?p=atoms-decorative-link)
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/form-download](?p=organisms-form-downloads)
- [@organisms/by-author/action-details](?p=organisms-action-details)
### Required Variables
~~~
actionDownloads: [{
    icon:
        type: string to svg template/required
    text:
        type: string/required
    href:
        type: string/required
    type:
        type: string/required
    size:
        type: string/required
    format:
        type: string/required
  }]
~~~
