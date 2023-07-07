const test = require("tap").test;
const statsbreaks = require("../dist/index.min.js");
const X = require('./test-data');

const InvalidNumberOfClassesError = statsbreaks.InvalidNumberOfClassesError;

// Methods that use the 'nb' parameter (so 'msd' and 'q6' are not included)
const methodThatUseNbParameter = [
  'equal',
  'quantile',
  'arithmetic',
  'geometric',
  'jenks',
  'headtail',
  'pretty',
];

// Run the tests for each method
methodThatUseNbParameter.forEach(function(method) {
  test(`The 'nb' parameter, `, function (t) {
    // Test with positive integer, inferior to two
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: 1 });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be superior or equal to 2"),
      `on method ${method}, should throw error if the number of classes inferior to 2`,
    );

    // Test with negative integer
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: -1 });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be superior or equal to 2"),
      `on method ${method}, should throw error if the number of classes inferior to 2`,
    );

    // Test with a string that can't be converted to a positive integer
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: 'abc' });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be a number"),
      `on method ${method}, should throw error if the number of classes is not a number`,
    );

    // Test with a floating-point number
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: 5.6 });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be an integer"),
      `on method ${method}, should throw error if the number of classes is a number but not an integer`,
    );

    // Test with a boolean
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: true });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be a number"),
      `on method ${method}, should throw error if the number of classes is not a number`,
    );

    // Test with an empty object
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: {} });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be a number"),
      `on method ${method}, should throw error if the number of classes is not a number`,
    );

    // Test with a non-empty object
    t.throws(function() {
        const breaks = statsbreaks.breaks([1, 2, 3, 4, 5, 6, 7, 8], { method, nb: { abc: 12 } });
      },
      new statsbreaks.InvalidNumberOfClassesError("The 'nb' parameter must be a number"),
      `on method ${method}, should throw error if the number of classes is not a number`,
    );

    // Test with a string that can be converted to a positive integer
    t.test(`on method ${method}, should succeed if the number of classes is a string that can be converted to a positive integer`,
      function (t) {
        const breaks = statsbreaks.breaks(X, { method, nb: '3' });
        t.same(breaks.length, 4);
        t.end();
      });

    // Test with nb null
    t.test(`on method ${method}, should return breaks with 5 classes if nb is null`, function (t) {
      const breaks = statsbreaks.breaks(X, { method, nb: null });

      // Headtail is allowed to not return the desired number of classes
      if (method !== 'headtail') {
        t.same(breaks.length, 6);
      }

      t.end();
    });

    // Test with nb undefined
    t.test(`on method ${method}, should return breaks with 5 classes if nb is undefined`, function (t) {
      const breaks = statsbreaks.breaks(X, { method, nb: undefined });

      // Headtail is allowed to not return the desired number of classes
      if (method !== 'headtail') {
        t.same(breaks.length, 6);
      }

      t.end();
    });

    t.end();
  });

});
