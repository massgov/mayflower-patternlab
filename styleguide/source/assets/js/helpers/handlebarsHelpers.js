export default function (window,document,Handlebars,undefined) {
  'use strict';

  /**
   * compare
   *
   * {{compare unicorns ponies operator="<"}}
   *   I knew it, unicorns are just low-quality ponies!
   * {{/compare}}
   *
   * (defaults to == if operator omitted)
   *
   * {{equal unicorns ponies }}
   *   That's amazing, unicorns are actually undercover ponies
   * {{/equal}}
   * (from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/)
   */
  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 3 parameters");

    let operator = options.hash.operator || "==";

    let operators = {
      '==':     function(l,r) { return l == r; },
      '===':    function(l,r) { return l === r; },
      '!=':     function(l,r) { return l != r; },
      '<':      function(l,r) { return l < r; },
      '>':      function(l,r) { return l > r; },
      '<=':     function(l,r) { return l <= r; },
      '>=':     function(l,r) { return l >= r; },
      '&&':     function(l,r) { return (l && r); },
      '||':     function(l,r) { return (l || r); },
      'typeof': function(l,r) { return typeof l == r; }
    };

    if (!operators[operator])
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    let result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });


  /**
   * Test a value and return a "yes" or "no" argument based on the result.
   *
   * @param {*} test Value to test for truthiness
   * @param {string} yes Value to return when test is truthy
   * @param {string} no Value to return when test is falsy
   */
  Handlebars.registerHelper('ternary', function(test, yes, no) {
    if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 3 parameters");
    }

    return (typeof test === 'function' ? test.call(this) : test) ? yes : no;
  });

  /**
   * Sets variable name to value.
   */
  Handlebars.registerHelper('var',function(name, value, context){
    this[name] = value;
  });

}(window,document,Handlebars);
