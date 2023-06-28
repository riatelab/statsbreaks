const test = require("tap").test;
const X = require("./test-data.js");
const statsbreaks = require("../dist/index.min.js");

test("CustomBreaksClassifier", function (t) {
  t.test('should return correct count by class for the test data', function (t) {
    const d = new statsbreaks.CustomBreaksClassifier(X);
    d.classify([0, 22, 674, 4112]);
    const count = d.countByClass()
    t.same(count, [38, 18, 2]);
    t.end();
  });

  t.end();
});