/**
 * @file
 * Ajax Alert js has to execute prior to its dependent accordion and emergency alert js modules.
 */

import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  $('.js-ajax-alerts').each(function(){
    let alertsEndpoint = $(this).data('js-alerts-endpoint');
    if (alertsEndpoint) {
      updateAlerts.apply(this, [alertsEndpoint]);
      $(this).removeClass('ma__ajax-alerts--no-alerts');
    }
  });

  function renderAlerts(alertsData) {
    if (alertsData.emergencyAlerts.alerts.length || alertsData.emergencyAlerts.emergencyHeader) {
      // Header
      let header = alertsData.emergencyAlerts.emergencyHeader;
      if (header) {
        let compiledTemplate = getTemplate("emergencyHeader");
        let markup = compiledTemplate(header);
        $(this).find('.js-ajax-alerts-header-content').replaceWith(markup);
      }

      // Buttons
      let button = alertsData.emergencyAlerts.buttonAlert;
      if (button) {
        let compiledTemplate = getTemplate("buttonAlert");
        let markup = compiledTemplate(button);
        $(this).find('.js-accordion-link').each(function(){
          $(this).html(markup);
        });
      }

      // Alerts
      let alerts = alertsData.emergencyAlerts.alerts;
      if (alerts.length) {
        let compiledTemplate = getTemplate("emergencyAlert");
        let markup = '';
        alerts.forEach(function(alert){
          markup += compiledTemplate(alert);
        });
        $('.js-ajax-alerts-content').html(markup);
      }
    }
  }

  function getAlertsData(endpoint) {
    // Keep .js-ajax-alerts object.
    let that = this;
    let promise = $.Deferred();

    $.ajax({
      type: 'GET',
      url: endpoint,
      cache: false,
      dataType: 'json'
    }).done(function(data){
      // @todo validate data against schema
      promise.resolve(data, that);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      promise.reject()
    });

    return promise;
  }

  function updateAlerts(endpoint) {
    getAlertsData.apply(this, [endpoint])
    .done(function(alertsData, that){
      // Id
      let id = alertsData.emergencyAlerts.id;
      $(that).find('.js-emergency-alerts').first().data('id', id);
      $(that).trigger('ma:AjaxAlerts:DataIdAdded', [{'id':id}]);

      renderAlerts.apply(that, [alertsData]);
    })
    .fail(function(){
      console.log('fail fail fail');
    });
  }
}(window,document,jQuery);
