/**
 * @file
 * Ajax Alert js has to execute prior to its dependent accordion and emergency alert js modules.
 */

export default function (window,document,$,undefined) {

  $('.js-ajax-alerts').each(function(){
    // Get the endpoint which is passed in as ajaxAlerts.endpoint to organism data attribute.
    let alertsEndpoint = $(this).data('js-alerts-endpoint');
    if (!alertsEndpoint) {
      console.error("MA::AjaxAlerts::No endpoint found at div.js-ajax-alerts['data-js-alerts-endpoint']");
      return false;
    }
    try {
      $(this).MassSetAlerts({"endpoint": alertsEndpoint});
    }
    catch (e) {
      console.error(e);
    }
  });

}(window,document,jQuery);
