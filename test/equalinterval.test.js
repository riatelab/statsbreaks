const test = require("tap").test;
const X = require("./test-data.js");
const statsbreaks = require("../dist/index.min.js");

test("equal", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'equal', nb: 5 });
    t.same(breaks, [0.13, 822.39, 1644.66, 2466.92, 3289.19, 4111.45]);
    t.end();
  });

  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3], { method: 'equal', nb: 5 });
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );
  t.end();
});

test("EqualClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.EqualClassifier(X);
    const breaks = d.classify(5);
    t.same(breaks, [0.13, 822.39, 1644.66, 2466.92, 3289.19, 4111.45]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.EqualClassifier(X);
    const breaks = d.classify(5);
    const count = d.countByClass()
    t.same(count, [57, 0, 0, 0, 1]);
    t.end();
  });

  t.throws(function() {
      const d = new statsbreaks.EqualClassifier([1, 2, 3]);
      const breaks = d.classify(5);
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.end();
});