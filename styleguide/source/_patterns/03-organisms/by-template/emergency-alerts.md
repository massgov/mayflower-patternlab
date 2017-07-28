### Description
This pattern is designed to be used site wide to show important alert messages 


### Status
* Stable as of 5.0.0


### Pattern Contains
* Emergency Header
* Button Alert
* Emergency Alert

### Usage Guidelines 
  * This Organism should only render if the alerts array is populated
  * Accordion only stays closed per session if the browser supports JS determined by a JS class on the html tag
  * The Id value should be consistent across the site, but can be changed when new alerts are created to reopen the accordion

### JavaScript Used
* Accordions (js/modules/accordions.js)
* Emergency Alerts (js/modules/emergencyAlerts.js)

### Variables
~~~
emergencyAlerts: {
  id: 
    type: string/guid/required
  buttonAlert: {
    type: buttonAlert / required
  },
  emergencyHeader: {
    type: emergencyHeader / required
  },
  alerts: [{
    type: array of emergencyAlert / required
  }]
}
~~~
