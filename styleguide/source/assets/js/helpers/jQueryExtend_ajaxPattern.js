import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  // Object-orientated approach to jQuery plugin building, so as to not
  // pollute global namespace or a complicated switch based on passed params.
  var ajaxPattern = function(element, options) {
    var endpoint = options.endpoint;
    var self = this;
    var patternTransform = options.transform;
    var pattern = options.renderPattern;
    var $element = $(element);

    /**
     * Wrapper function to get and render alert data.
     */
    self.updatePattern = function() {
      self.getPatternData()
        .then(function (patternData) {
          // If we don't have the parent data structure we need, exit.
          // if (!patternData.hasOwnProperty('emergencyAlerts')) {
          //   console.error('MA::AjaxAlerts::Endpoint data missing emergencyAlerts object: ', patternData);
          //   return false;
          // }

          // Get the passed Id, set a default value if none passed.
          // let id = patternData.emergencyAlerts.id ? patternData.emergencyAlerts.id : 'noId';
          // // Populate the emergency alerts container data attribute with the passed id.
          // $element.find('.js-emergency-alerts').first().data('id', id);
          // // Trigger an event exposing the new id for emergency alerts js.

          if (patternTransform && typeof patternTransform === "function") {
            patternData = patternTransform(patternData);
          }

            // Only render data if there are either alerts or an emergency Header.
            // if ((patternData.emergencyAlerts.hasOwnProperty('alerts') && patternData.emergencyAlerts.alerts.length) || (patternData.emergencyAlerts.hasOwnProperty('emergencyHeader') && Object.keys(patternData.emergencyAlerts.emergencyHeader).length)) {
              // Render the pattern with the data.
              try {
                self.renderPattern(pattern,patternData);
              }
              catch (e) {
                console.error(e);
              }
            // }
            // else {
            //   console.error('MA::AjaxAlerts::No alerts or emergencyHeader data passed in data: ', patternData);
            // }
        })
        .fail(function () {
          console.error('MA::AjaxAlerts::Could not get alert data at endpoint.');
        });
    };

    self.renderPattern = function(pattern,data) {
      let template = Twig.twig({
        href: self.getPatternPath(pattern),
        id: pattern,
        async: false,
        allowInlineIncludes: true,
        // Set ma.patternsPath in your implementation's env.js file (see /source/_meta/_00-foot.twig)
        namespaces: {
          'base': ma.patternsPath + "/00-base",
          'atoms': ma.patternsPath + "/01-atoms",
          'molecules': ma.patternsPath + "/02-molecules",
          'organisms': ma.patternsPath + "/03-organisms",
          'templates': ma.patternsPath + "/04-templates",
          'pages': ma.patternsPath + "/05-pages",
          'meta': ma.patternsPath + "/07-meta",
        }
      });

      let markup = Twig.twig({
        ref: pattern
      }).render(data);

      $element.html(markup);

      // Trigger an event exposing the new id for emergency alerts js.
      $(document).trigger('ma:AjaxPattern:Render', [{'el': $element}]);
    };

    self.getPatternPath = function(pattern) {
      let pathParts = pattern.split("/");
      let namespace = pathParts.shift();
      let patternPath = pathParts.join("/");
      // Set ma.patternsPath in your implementation's env.js file (see /source/_meta/_00-foot.twig)
      let paths = {
        '@base': ma.patternsPath + "/00-base/",
        '@atoms': ma.patternsPath + "/01-atoms/",
        '@molecules': ma.patternsPath + "/02-molecules/",
        '@organisms': ma.patternsPath + "/03-organisms/",
        '@templates': ma.patternsPath + "/04-templates/",
        '@pages': ma.patternsPath + "/05-pages/",
        '@meta': ma.patternsPath + "/07-meta/"
      };

      return paths[namespace] + patternPath;
    };

    /**
     * Asynchronous function which makes ajax request to passed in endpoint to get emergency alerts data.
     *
     * @returns {*}
     *   A promise.
     */
    self.getPatternData = function() {
      if (!endpoint) {
        // throw an error
        throw new Error('MA::AjaxPattern::An endpoint argument is required.');
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
        console.error('MA::AjaxPattern::Ajax Error: ', textStatus);
        promise.reject()
      });


      return promise;
    };

    self.updatePattern();
    return true;
  };


  /**
   * Create a custom Transform plugin.
   */
  $.fn.MassAjaxPattern = function(options) {

    return this.each(function(i, el) {
      var $element = $(el);
      // Returns early if plugin is already there.
      if ($element.data('mass-ajax-data')) {
        return;
      }
      var data = new ajaxPattern(this, options);
      $element.data('mass-ajax-data', data);
    });

  };

  // Plugin defaults.
  $.fn.MassAjaxPattern.defaults = {
    endpoint: '',
    pattern: '',
    transform: undefined
  };
}(window,document,jQuery);
