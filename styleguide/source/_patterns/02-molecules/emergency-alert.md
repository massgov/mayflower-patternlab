---
title: Emergency Alert
---
Description: Emergency Alert message describing the event with a timestamp reflecting when this message was created.  An optional link is provided to take the user to page with more information

## State: ALPHA

###  Notes
Link is optional.
messages are sorted with the newest one first

### Used in: 
organisms/by-template/emergency-alerts.twig 

### Contains
atoms/11-text/link.twig

### Variables 
~~~ 
emergencyAlert: {
  message: 
    type: string/required,
  timeStamp: 
    type: date/required
    format: mm.dd.yy, h:mm am/pm
  link: {
    href: 
      type: string/url,
    text:
      type: string,
    chevron:
      type: string => always "true"
  }
}
~~~