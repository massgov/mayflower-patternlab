/**
 * @file
 * This demonstrates how to pass a transform function to MassSetAlerts.
 */

export default function (window,document,$,undefined) {

  // Note that this selector is passed into the template so that this is run instead of the
  // default 'js-ajax-alerts'.  See the ajaxAlerts.customSelector in guide.json page object.
  // In an implementation of this you would want to create your own selector and avoid
  // js-ajax-alerts and js-ajax-alerts-override since Mayflower will attach to these.
  $('.js-ajax-alerts-override').each(function(){
    // Get the endpoint which is passed in as ajaxAlerts.endpoint to organism data attribute.
    let alertsEndpoint = $(this).data('js-alerts-endpoint');
    if (!alertsEndpoint) {
      console.error("MA::AjaxAlerts::No endpoint found at div.js-ajax-alerts['data-js-alerts-endpoint']");
      return false;
    }
    try {
      $(this).MassSetAlerts({
        "endpoint": alertsEndpoint,
        "transform": function(alertData) {
          // Example of the structure being almost correct, but needing alertsOverride property copied to alerts.
          data = alertData;
          data.emergencyAlerts.alerts = data.emergencyAlerts.alertsOverride;
          return data;
        }
      });
    }
    catch (e) {
      console.error(e);
    }
  });

}(window,document,jQuery);
