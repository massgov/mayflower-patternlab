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
  * This will render as is if the endpoint is valid and data matching the structure Emergency Alerts is received.
  * If the endpoint will not provide data matching the structure, a custom selector can be passed into the component. If this is the case, the implementation should include JavaScript that uses the MassSetAlerts jQuery plugin, passing in a function that transforms the data from the endpoint into the structure of the Emergency Alerts.
  * See usage guidelines for Emergency Alerts

### JavaScript Used
* Ajax Alerts (js/modules/ajaxAlerts.js)
* Accordions (js/modules/accordions.js)
* Emergency Alerts (js/modules/emergencyAlerts.js)
* jQuery Extend (js/helpers/jQueryExtend.js)

### Variables
~~~
ajaxAlerts: {
  endpoint: 
    type: string (url) / required
    customSelector: string / optional
}
~~~

### Sample use of MassSetAlerts

$('.js-ajax-alerts-custom').each(function(){
  // Get the endpoint which is passed in as ajaxAlerts.endpoint to organism data attribute.
  let alertsEndpoint = $(this).data('js-alerts-endpoint');
  if (!alertsEndpoint) {
    console.error("MA::AjaxAlerts::No endpoint found at div.js-ajax-alerts['data-js-alerts-endpoint']");
    return false;
  }
  try {
    $(this).MassSetAlerts({
      "endpoint": alertsEndpoint,
      "transform": function(data) {
        // Return the data in the format expected by Emergency Alerts.
      }
    });
  }
  catch (e) {
    console.error(e);
  }
});
