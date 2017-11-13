import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  // Object-orientated approach to jQuery plugin building, so as to not
  // pollute global namespace or a complicated switch based on passed params.
  var MassAlerts = function(element, options) {
    var endpoint = options.endpoint;
    var self = this;
    var alertsTransform = options.transform;
    var $element = $(element);

    /**
     * Wrapper function to get and render alert data.
     *
     * @param endpoint
     *   Endpoint where emergency alert json data can be gotten.
     */
    self.updateAlerts = function() {
      self.getAlertsData()
        .then(function (alertsData) {
          // If we don't have the parent data structure we need, exit.
          if (!alertsData.hasOwnProperty('emergencyAlerts')) {
            console.error('MA::AjaxAlerts::Endpoint data missing emergencyAlerts object: ', alertsData);
            return false;
          }

          // Get the passed Id, set a default value if none passed.
          let id = alertsData.emergencyAlerts.id ? alertsData.emergencyAlerts.id : 'noId';
          // Populate the emergency alerts container data attribute with the passed id.
          $element.find('.js-emergency-alerts').first().data('id', id);
          // Trigger an event exposing the new id for emergency alerts js.
          $element.trigger('ma:AjaxAlerts:DataIdAdded', [{'id': id}]);

          if (alertsTransform && typeof alertsTransform === "function") {
            alertsData = alertsTransform(alertsData);
          }

          // Only render data if there are either alerts or an emergency Header.
          if ((alertsData.emergencyAlerts.hasOwnProperty('alerts') && alertsData.emergencyAlerts.alerts.length) || (alertsData.emergencyAlerts.hasOwnProperty('emergencyHeader') && Object.keys(alertsData.emergencyAlerts.emergencyHeader).length)) {
            // Render the emergency header and / or alert content.
            try {
              self.renderAlerts(alertsData);
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
    };

    /**
     * Populate the scaffold emergency alerts markup with the emergency alert json data and make the ajax alert organism visible.
     *
     * @param alertsData
     *   The emergency alert data structure.
     *   @see @organisms/by-template/emergency-alerts.json
     */
    self.renderAlerts = function(alertsData) {
      let $el = $element,
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
      $element.removeClass('ma__ajax-alerts--no-alerts');
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
    self.getAlertsData = function() {
      if (!endpoint) {
        // throw an error
        throw new Error('MA::AjaxAlerts::An endpoint argument is required.');
      }

      // Keep .js-ajax-alerts object.
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
        promise.resolve(data);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('MA::AjaxAlerts::Ajax Error: ', textStatus);
        promise.reject()
      });


      return promise;
    }

    self.updateAlerts();
    return true;
  }


  /**
   * Create a custom Transform plugin.
   */
  $.fn.MassSetAlerts = function(options) {

    return this.each(function(i, el) {
      var $element = $(el);
      // Returns early if plugin is already there.
      if ($element.data('mass-set-alerts')) {
        return;
      }
      var alerts = new MassAlerts(this, options);
      $element.data('mass-set-alerts', alerts);
    });

  };

  // Plugin defaults.
  $.fn.MassSetAlerts.defaults = {
    endpoint: '',
    transform: undefined
  };
}(window,document,jQuery);
