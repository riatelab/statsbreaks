const test = require("tap").test;
const statsbreaks = require("../dist/index.min.js");
const X = require('./test-data');

const methods = [
  'equal',
  'quantile',
  'arithmetic',
  'geometric',
  'jenks',
  'headtail',
  'pretty',
  'msd',
  'q6',
];

// Run the tests for each method
methods.forEach(function(method) {
  test(`The 'minmax' parameter, `, function (t) {
    t.test('should always return an array with 2 fewer elements than if not used',
      function (t) {
        const b1 = statsbreaks.breaks(X, { method, minmax: false });
        const b2 = statsbreaks.breaks(X, { method });

        t.same(b2.length - 2, b1.length);

        t.end();
      });
    t.end();
  });
});
