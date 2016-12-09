---
title: Emergency Alert
---
Description: an organism to show any current emergency alerts 

## State: ALPHA

### Notes 
  1. This Organism should only render if the alerts array is populated
  2. Accordion only stays closed per session if the browser supports JS determined by a JS class on the html tag
  3. The Id value should be consistent across the site, but can be changed when new alerts are created to reopen the accordion

### Used in: 
* [@templates/multi-row-template.twig](/?p=templates-multi-row-template)
* [@templates/single-column.twig](/?p=templates-single-column)
* [@templates/two-column.twig](/?p=templates-two-column)

### Contains:
* [@molecules/emergency-header.twig](/?p=molecules-emergency-header)
* [@molecules/emergency-alert.twig](/?p=molecules-emergency-alert)
* [@molecules/button-alert.twig](/?p=molecules-button-alert)

### Variables 
~~~ 
emergencyAlerts: {
  id: 
    type: string/guid/required
  buttonAlert: {
    hideText: 
      type: string/required,
    showText: 
      type: string/required,
    text: 
      type: string/required
  },

  emergencyHeader: {
    title: 
      type: string/required
  },

  alerts: [{
    message: 
      type: string/required
    timeStamp: 
      type: date/required
      format: mm.dd.yy, h:mm am/pm
    link: {
      href: 
        type: string/url/required,
      text:
        type: string/required
      chevron: 
        type: boolean/required
    }
  }]
}
~~~
