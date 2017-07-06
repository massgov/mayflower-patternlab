module.exports = function(name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      jQuery.ajax({
          url : ma.templatePath + '/js/templates/' + name + '.html',
          success : function(data) {
              if (Handlebars.templates === undefined) {
                  Handlebars.templates = {};
              }
              Handlebars.templates[name] = Handlebars.compile(data);
          },
          async : false
      });
  }
  return Handlebars.templates[name];
};
