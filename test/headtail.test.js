const test = require("tap").test;
const X = require("./test-data.js");
const statsbreaks = require("../dist/index.min.js");

test("headtail", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const breaks = statsbreaks.breaks(X, { method: 'headtail', nbClass: 3 });
    t.same(breaks, [0.13, 125.93, 811.26, 4111.45]);
    t.end();
  });

  t.end();
});

test("HeadtailClassifier", function (t) {
  t.test('should return correct breaks for the test data', function (t) {
    const d = new statsbreaks.HeadTailClassifier(X);
    const breaks = d.classify(3);
    t.same(breaks, [0.13, 125.93, 811.26, 4111.45]);
    t.end();
  });

  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.HeadTailClassifier(X);
    const breaks = d.classify(3);
    const count = d.countByClass()
    t.same(count, [50, 7, 1]);
    t.end();
  });

  t.end();
});