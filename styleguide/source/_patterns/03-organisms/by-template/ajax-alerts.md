### Description
This pattern is designed to be used site wide to show important alert messages which are requested from an api endpoint.


### Status
* Alpha


### Pattern Contains
Handlebars version of:
* Emergency Header
* Button Alert
* Emergency Alert

### Usage Guidelines 
  * This will only render if the endpoint is valid and data matching the structure Emergency Alerts is received 
  * See usage guidelines for Emergency Alerts

### JavaScript Used
* Ajax Alerts (js/modules/ajaxAlerts.js)
* Accordions (js/modules/accordions.js)
* Emergency Alerts (js/modules/emergencyAlerts.js)

### Variables
~~~
ajaxAlerts: {
  endpoint: 
    type: string (url) / required
}
~~~
