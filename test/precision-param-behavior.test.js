const test = require("tap").test;
const statsbreaks = require("../dist/index.min.js");
const X = require('./test-data');

const InvalidPrecisionError = statsbreaks.InvalidPrecisionError;

const allBreaksMethods = [
  'arithmetic',
  'equal',
  'geometric',
  'headtail',
  'jenks',
  'msd',
  'pretty',
  'q6',
  'quantile',
];

// Run the tests for each method
allBreaksMethods.forEach(function(method) {
  test(`The 'precision' parameter, `, function (t) {
    // Test with a negative integer
    t.throws(function() {
        const breaks = statsbreaks.breaks(X, { method, nb: 5, precision: -1 });
      },
      new InvalidPrecisionError("The 'precision' parameter must be superior or equal to 0"),
      `should be superior or equal to 0 (on method ${method})`,
    );

    // Test with a floating-point number
    t.throws(function() {
        const breaks = statsbreaks.breaks(X, { method, nb: 5, precision: 2.7 });
      },
      new InvalidPrecisionError("The 'precision' parameter must be an integer"),
      `should be an integer (on method ${method})`,
    );

    // Test with a string that can't be converted to a positive integer
    t.throws(function() {
        const breaks = statsbreaks.breaks(X, { method, nb: 5, precision: 'abc' });
      },
      new InvalidPrecisionError("The 'precision' parameter must be a number"),
      `should can be converted to a number (on method ${method})`,
    );

    // Test with a boolean
    t.throws(function() {
        const breaks = statsbreaks.breaks(X, { method, nb: 5, precision: true });
      },
      new InvalidPrecisionError("The 'precision' parameter must be a number"),
      `should can be converted to a number (on method ${method})`,
    );

    // Test with an empty object
    t.throws(function() {
        const breaks = statsbreaks.breaks(X, { method, nb: 5, precision: {} });
      },
      new InvalidPrecisionError("The 'precision' parameter must be a number"),
      `should can be converted to a number (on method ${method})`,
    );

    // Test with a string that can be converted to a positive integer
    t.test(`on method ${method}, should succeed if the precision is a string that can be converted to a positive integer`,
      function (t) {
        const breaks = statsbreaks.breaks(X, { method, nb: 3, precision: '0' });
        breaks.forEach(function(b) {
          // Since we rounded to 0 digits, the breaks should be integers:
          t.same(b % 1, 0);
        });
        t.end();
      });

    // Test with precision null
    t.test(`on method ${method}, should not round breaks if precision is null`, function (t) {
      const values = [
        3.6643508679064443e-28, 7.294082182097556e-28, 1.4340929848339206e-27,
        2.7857084049854467e-27, 5.344775300045348e-27, 1.0131982325610924e-26,
        1.8973352773169297e-26, 3.5097084193183684e-26, 6.412821012971875e-26,
        1.1576549807855486e-25, 2.0643593792949354e-25, 3.636102486891999e-25,
        6.327622432834292e-25, 1.0877409751170753e-24, 1.8470852690626588e-24,
        3.0980894887699536e-24, 5.1335525726319006e-24, 8.403479632386147e-24,
        1.3587755172362854e-23, 2.170575708720219e-23, 3.4252501432321e-23,
        5.339333723962586e-23, 8.221402331307723e-23, 1.2506330685399973e-22,
        1.8793260537020868e-22, 2.7895234849124425e-22, 4.0906269906442664e-22,
        5.925794882791488e-22, 8.479794793663697e-22, 1.198671444423588e-21,
        1.6739052855873421e-21, 2.3092473458167115e-21, 3.1468426388799863e-21,
        4.2365226372575385e-21, 5.6343540709988026e-21, 7.40244334070488e-21,
        9.60714382165509e-21, 1.231778076166155e-20, 1.5602172469637237e-20,
        1.9521987522069968e-20, 2.4131866691415125e-20, 2.946923020686793e-20,
        3.555179944370005e-20, 4.237000689490457e-20, 4.9885928268100504e-20,
        5.802622883210619e-20, 6.66774911389481e-20, 7.569544002639535e-20,
        8.489563360489422e-20, 9.406542183353323e-20, 1.029681535089398e-19,
        1.1135590709189528e-19, 1.189769547198936e-19
      ];
      const breaks = statsbreaks.breaks(values, { method, nb: 5, precision: null });
      // We dont test that on the pretty method because it retuns breaks
      // for which the min and the max are not the min and the max of the values
      if (method !== 'pretty') {
        const expectedBreaksMin = 3.6643508679064443e-28;
        const expectedBreaksMax = 1.189769547198936e-19;
        t.same(breaks[0], expectedBreaksMin);
        t.same(breaks[breaks.length - 1], expectedBreaksMax);
      }
      t.end();
    });

    // Test with nb undefined
    t.test(`on method ${method}, should round to 2 if precision is left undefined`, function (t) {
      const values = [
        3.6643508679064443e-28, 7.294082182097556e-28, 1.4340929848339206e-27,
        2.7857084049854467e-27, 5.344775300045348e-27, 1.0131982325610924e-26,
        1.8973352773169297e-26, 3.5097084193183684e-26, 6.412821012971875e-26,
        1.1576549807855486e-25, 2.0643593792949354e-25, 3.636102486891999e-25,
        6.327622432834292e-25, 1.0877409751170753e-24, 1.8470852690626588e-24,
        3.0980894887699536e-24, 5.1335525726319006e-24, 8.403479632386147e-24,
        1.3587755172362854e-23, 2.170575708720219e-23, 3.4252501432321e-23,
        5.339333723962586e-23, 8.221402331307723e-23, 1.2506330685399973e-22,
        1.8793260537020868e-22, 2.7895234849124425e-22, 4.0906269906442664e-22,
        5.925794882791488e-22, 8.479794793663697e-22, 1.198671444423588e-21,
        1.6739052855873421e-21, 2.3092473458167115e-21, 3.1468426388799863e-21,
        4.2365226372575385e-21, 5.6343540709988026e-21, 7.40244334070488e-21,
        9.60714382165509e-21, 1.231778076166155e-20, 1.5602172469637237e-20,
        1.9521987522069968e-20, 2.4131866691415125e-20, 2.946923020686793e-20,
        3.555179944370005e-20, 4.237000689490457e-20, 4.9885928268100504e-20,
        5.802622883210619e-20, 6.66774911389481e-20, 7.569544002639535e-20,
        8.489563360489422e-20, 9.406542183353323e-20, 1.029681535089398e-19,
        1.1135590709189528e-19, 1.189769547198936e-19
      ];
      const breaks = statsbreaks.breaks(values, { method, nb: 5, minmax: false }); // Dont take minmax as it will help for comparison
      breaks.forEach((b, i) => {
        t.same(b, 0);
      });
      t.end();
    });

    t.end();
  });

});
