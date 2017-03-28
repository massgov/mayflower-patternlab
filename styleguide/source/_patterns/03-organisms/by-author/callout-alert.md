---
title: Callout Alert
---
Description: Displays an icon followed by an alert message which is usually a link to more information about the alert. 

## Status: ALPHA

### Uses:
- [@atoms/decorative-link](/?p=atoms-decorative-link)

### Required Variables
~~~
calloutAlert {
  decorativeLink: {
    href:
      type: string/optional
    text:
      type: string/required
    property:
      type: string/optional ("schema")
    info:
      type: string/optional
    }
  }
}
~~~
