/**
 * @file
 * Ajax Alert js has to execute prior to its dependent accordion and emergency alert js modules.
 */

import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {

  $('.js-ajax-alerts').each(function(){
    let $el = $(this);
    let data = {
      "emergencyAlerts": {
        "id":"GUID18378923w38789",
        "buttonAlert": {
          "hideText": "Hide",
          "showText": "Show",
          "text": "Alerts"
        },
        "emergencyHeader": {
          "title": "The State is experiencing severe weather due to the winter storm Paula."
        },
        "alerts": [{
          "message": "MassPort is operating with limited flights due to road closures.",
          "timeStamp": "02.15.16, 5:00 p.m.",
          "link": {
            "href": "#",
            "text":"Read full alert",
            "chevron": "true"
          }
        },{
          "message": "The MTBA is operating at a lighter service level, and experiencing delays.",
          "timeStamp": "02.15.16, 3:00 p.m.",
          "link": {
            "href": "#",
            "text":"Read full alert",
            "chevron": "true"
          }
        },{
          "message": "The Governor directs non-emergency executive branch state employees to not come in to work.",
          "timeStamp": "02.13.16, 10:00 a.m.",
          "link": {
            "href": "#",
            "text":"Read full alert",
            "chevron": "true"
          }
        }]
      }
    };

    if (data.emergencyAlerts.alerts.length || data.emergencyAlerts.emergencyHeader) {
      let compiledTemplate = getTemplate("emergencyAlerts");
      let markup = compiledTemplate(data);
      $el.html(markup);
    }
  });
}(window,document,jQuery);
