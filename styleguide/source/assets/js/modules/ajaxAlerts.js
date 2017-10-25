/**
 * @file
 * Ajax Alert js has to execute prior to its dependent accordion and emergency alert js modules.
 */

import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  $('.js-ajax-alerts').each(function(){
    // Get the endpoint which is passed in as ajaxAlerts.endpoint to organism data attribute.
    let alertsEndpoint = $(this).data('js-alerts-endpoint');
    if (!alertsEndpoint) {
      console.error("MA::AjaxAlerts::No endpoint found at div.js-ajax-alerts['data-js-alerts-endpoint']");
      return false;
    }
    try {
      updateAlerts.apply(this, [alertsEndpoint]);
    }
    catch (e) {
      console.error(e);
    }
  });

  /**
   * Wrapper function to get and render alert data.
   *
   * @param endpoint
   *   Endpoint where emergency alert json data can be gotten.
   */
  function updateAlerts(endpoint) {
    getAlertsData.apply(this, [endpoint])
      .done(function (alertsData, that) {
        // If we don't have the parent data structure we need, exit.
        if (!alertsData.hasOwnProperty('emergencyAlerts')) {
          console.error('MA::AjaxAlerts::Endpoint data missing emergencyAlerts object: ', alertsData);
          return false;
        }

        // Get the passed Id, set a default value if none passed.
        let id = alertsData.emergencyAlerts.id ? alertsData.emergencyAlerts.id : 'noId';
        // Populate the emergency alerts container data attribute with the passed id.
        $(that).find('.js-emergency-alerts').first().data('id', id);
        // Trigger an event exposing the new id for emergency alerts js.
        $(that).trigger('ma:AjaxAlerts:DataIdAdded', [{'id': id}]);

        // Only render data if there are either alerts or an emergency Header.
        if ((alertsData.emergencyAlerts.hasOwnProperty('alerts') && alertsData.emergencyAlerts.alerts.length) || (alertsData.emergencyAlerts.hasOwnProperty('emergencyHeader') && Object.keys(alertsData.emergencyAlerts.emergencyHeader).length)) {
          // Render the emergency header and / or alert content.
          try {
            renderAlerts.apply(that, [alertsData]);
          }
          catch (e) {
            console.error(e);
          }
        }
        else {
          console.error('MA::AjaxAlerts::No alerts or emergencyHeader data passed in data: ', alertsData);
        }
      })
      .fail(function () {
        console.error('MA::AjaxAlerts::Could not get alert data at endpoint.');
      });
  }

  /**
   * Populate the scaffold emergency alerts markup with the emergency alert json data and make the ajax alert organism visible.
   *
   * @param alertsData
   *   The emergency alert data structure.
   *   @see @organisms/by-template/emergency-alerts.json
   */
  function renderAlerts(alertsData) {
    let $el = $(this),
        $alertHeaderContent = $el.find('.js-ajax-alerts-header-content'),
        $button = $el.find('.js-accordion-link'),
        $alerts = $el.find('.js-ajax-alerts-content');

    if (!$alertHeaderContent.length) {
      throw new Error('MA::AjaxAlerts::An emergency header content container must exist.');
    }
    if (!$alerts.length) {
      throw new Error('MA::AjaxAlerts::An emergency alerts content container must exist.');
    }

    // Determine if there is an emergency header.
    let header = alertsData.emergencyAlerts.emergencyHeader ? alertsData.emergencyAlerts.emergencyHeader : false;
    if (header) {
      // Generate the markup for the emergency header.
      let compiledTemplate = getTemplate("emergencyHeader");
      let markup = compiledTemplate(header);
      // Render the emergency header markup.
      $alertHeaderContent.replaceWith(markup);
    }

    // Determine if there is alert button data.
    let button = alertsData.emergencyAlerts.buttonAlert ? alertsData.emergencyAlerts.buttonAlert : false;
    if (button) {
      // Generate the markup for the show/hide alerts accordion button.
      let compiledTemplate = getTemplate("buttonAlert");
      let markup = compiledTemplate(button);
      $button.each(function(){
        // Render the alert accordion buttons markup.
        $(this).html(markup);
      });
    }

    // Determine if there is alert data.
    let alerts = alertsData.emergencyAlerts.alerts ? alertsData.emergencyAlerts.alerts : false;
    if (alerts.length) {
      // Generate the markup for all of the alerts.
      let compiledTemplate = getTemplate("emergencyAlert");
      let markup = '';
      alerts.forEach(function(alert){
        markup += compiledTemplate(alert);
      });
      // Render all of the alerts.
      $alerts.html(markup);
    }
    else {
      // No alerts so hide the show/hide button(s).
      $button.each(function(){
        $(this).hide();
      });
    }
    // Make the emergencyHeader and / or Alerts visible.
    $(this).removeClass('ma__ajax-alerts--no-alerts');
  }

  /**
   * Asynchronous function which makes ajax request to passed in endpoint to get emergency alerts data.
   *
   * @param endpoint
   *   The endpoint which renders the emergency alerts json structure.
   *
   * @returns {*}
   *   A promise.
   */
  function getAlertsData(endpoint) {
    if (!endpoint) {
      // throw an error
      throw new Error('MA::AjaxAlerts::An endpoint argument is required.');
    }

    // Keep .js-ajax-alerts object.
    let that = this;
    let promise = $.Deferred();

    // Make ajax request to endpoint
    $.ajax({
      type: 'GET',
      url: endpoint,
      cache: false,
      dataType: 'json'
    }).done(function(data){
      // @todo validate data against schema
      // Resolve the promise, pass the .js-ajax-alerts object for rendering.
      promise.resolve(data, that);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('MA::AjaxAlerts::Ajax Error: ', textStatus);
      promise.reject()
    });

    return promise;
  }

}(window,document,jQuery);
