const test = require("tap").test;
const X = require("./test-data.js");
const statsbreaks = require("../dist/index.min.js");

test("jenks", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'jenks', nb: 5 });
    t.same(breaks, [0.13, 75.29, 192.05, 370.50, 722.85, 4111.45]);
    t.end();
  });

  t.throws(function() {
      const breaks = statsbreaks.breaks([1, 2, 3], { method: 'jenks', nb: 5 });
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );
  t.end();
});

test("JenksClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.JenksClassifier(X);
    const breaks = d.classify(5);
    t.same(breaks, [0.13, 75.29, 192.05, 370.50, 722.85, 4111.45]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.JenksClassifier(X);
    const breaks = d.classify(5);
    const count = d.countByClass()
    t.same(count, [49, 3, 4, 1, 1]);
    t.end();
  });

  t.throws(function() {
      const d = new statsbreaks.JenksClassifier([1, 2, 3]);
      const breaks = d.classify(5);
    },
    new statsbreaks.TooFewValuesError('Too few values for the given number of breaks'),
    'should throw error if the number of classes is too high',
  );

  t.end();
});