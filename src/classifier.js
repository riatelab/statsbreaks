import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { mean } from "./helpers/mean";
import { median } from "./helpers/median";
import { deviation } from "./helpers/deviation";
import { quantile } from "./method-quantile";
import { jenks } from "./method-jenks";
import { equal } from "./method-equal";
import { q6 } from "./method-q6";
import { msd } from "./method-msd";
import { geometricProgression } from "./method-geometric-progression";
import { headtail } from "./method-headtail";
import { isNumber } from "./helpers/is-number";
import { pretty } from "./method-pretty";
import {arithmeticProgression} from './method-arithmetic-progression';

class AbstractClassifier {
  constructor(values, precision) {
    if (this.constructor === AbstractClassifier) {
      throw new TypeError(
        'Abstract class "AbstractClassifier" cannot be instantiated directly.'
      );
    }
    this._values = values;
    this.precision = precision == null || !isNumber(precision) ? 2 : precision;
    this.type = null;
    this.nClasses = null;
    this._breaks = null;
    this._min = null;
    this._max = null;
    this._mean = null;
    this._median = null;
    this._stddev = null;
    this._counts = null;
  }

  /**
   * Get the series.
   *
   * @returns {number[]}
   */
  get values() {
    return this._values;
  }

  /**
   * Changing manually the series should reset the computed values.
   */
  set values(values) {
    this._values = values;
    this._min = null;
    this._max = null;
    this._mean = null;
    this._median = null;
    this._stddev = null;
    this._counts = null;
    this._breaks = null;
    this.nClasses = null;
  }

  /**
   * Get the breaks of the classifier.
   *
   * @returns {number[]}
   */
  get breaks() {
    return this._breaks;
  }

  /**
   * Set the breaks of the classifier.
   *
   * @param {number[]} breaks - The breaks to set.
   * @returns {void}
   */
  set breaks(breaks) {
    this._breaks = breaks;
    this.nClasses = breaks.length - 1;
    this._counts = null;
  }

  /**
   * Get the minimum value of the series.
   *
   * @returns {number}
   */
  min() {
    if (this._min === null) {
      this._min = min(this._values);
      return this._min;
    }
    return this._min;
  }

  /**
   * Get the maximum value of the series.
   *
   * @returns {number}
   */
  max() {
    if (this._max === null) {
      this._max = max(this._values);
      return this._max;
    }
    return this._max;
  }

  /**
   * Get the mean value of the series.
   *
   * @returns {number}
   */
  mean() {
    if (this._mean === null) {
      this._mean = mean(this._values);
      return this._mean;
    }
    return this._mean;
  }

  /**
   * Get the median value of the series.
   *
   * @returns {number}
   */
  median() {
    if (this._median === null) {
      this._median = median(this._values);
      return this._median;
    }
    return this._median;
  }

  /**
   * Get the standard deviation of the series.
   *
   * @returns {number}
   */
  stddev() {
    if (this._stddev === null) {
      this._stddev = deviation(this._values);
      return this._stddev;
    }
    return this._stddev;
  }

  /**
   * Get the population of the series.
   *
   * @returns {number}
   */
  population() {
    return this._values.length;
  }

  /**
   * Get the counts of the series by class.
   *
   * @returns {number[]}
   */
  countByClass() {
    if (this._breaks === null) {
      throw new Error(
        'Breaks are not set, please call the "classify" method first'
      );
    }
    if (this._counts === null) {
      const counts = new Array(this.nClasses).fill(0);
      for (let i = 0; i < this._values.length; i++) {
        const value = this._values[i];
        const index = this.getClass(value);
        counts[index]++;
      }
      this._counts = counts;
    }
    return this._counts;
  }

  /**
   * Get the class to which the given value belongs.
   * @param {number} value
   * @returns {number}
   */
  getClass(value) {
    if (this._breaks === null) {
      throw new Error(
        'Breaks are not set, please call the "classify" method first'
      );
    }
    for (let i = 0, breaksLength = this._breaks.length; i < breaksLength; i++) {
      if (value <= this._breaks[i + 1]) {
        return i;
      }
    }
    return this.nClasses;
  }

  /**
   * Method to classify the series into the given number of classes - should be implemented by subclasses.
   * @abstract
   * @return {number[]}
   * @throws {Error} - Method not implemented.
   */
  classify() {
    throw new Error('Method "classify" is not implemented');
  }
}

/**
 * Class representing a classifier using "Jenks" classification method.
 * @extends AbstractClassifier
 */
class JenksClassifier extends AbstractClassifier {
  /**
   * Create a classifier using Jenks classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "jenks";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify(nClasses) {
    this.breaks = jenks(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Quantiles" classification method.
 * @extends AbstractClassifier
 */
class QuantileClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Quantiles" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "jenks";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify(nClasses) {
    this.breaks = quantile(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Equal Interval" classification method.
 * @extends AbstractClassifier
 */
class EqualClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Equal Interval" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "equal";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify(nClasses) {
    this.breaks = equal(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Geometric progression" classification method.
 * @extends AbstractClassifier
 */
class GeometricProgressionClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Geometric progression" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "geometric";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   * @throws {ValuesInferiorOrEqualToZeroError}
   */
  classify(nClasses) {
    this.breaks = geometricProgression(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Q6" classification method.
 * @extends AbstractClassifier
 */
class Q6Classifier extends AbstractClassifier {
  /**
   * Create a classifier using "Q6" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "q6";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify() {
    this.breaks = q6(this._values, { precision: this.precision });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using custom (user defined) breaks.
 * @extends AbstractClassifier
 */
class CustomBreaksClassifier extends AbstractClassifier {
  /**
   * Create a classifier using custom (user defined) breaks.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision, breaks) {
    super(values, precision);
    this.type = "custom";
    this.breaks = breaks;
  }

  /**
   * Use the given breaks to classify the series.
   *
   * @param {number[]} breaks - The break values to use.
   * @returns {number[]}
   */
  classify(breaks) {
    this.breaks = breaks;
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Mean and Standard deviation" classification method.
 * @extends AbstractClassifier
 */
class MsdClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Mean and Standard deviation" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "msd";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} k - Number of standard deviations taken into account.
   * @param {boolean} middle - Whether to use the average of the series as a class center.
   * @returns {number[]}
   */
  classify(k = 1, middle = true) {
    this.breaks = msd(this._values, {
      precision: this.precision,
      middle: middle,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Head/Tail" classification method.
 * @extends AbstractClassifier
 */
class HeadTailClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Head/Tail" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "headtail";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   */
  classify(nClasses) {
    this.breaks = headtail(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "pretty breaks" classification method.
 * @extends AbstractClassifier
 */
class PrettyBreaksClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "pretty breaks" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "pretty";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify(nClasses) {
    this.breaks = pretty(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

/**
 * Class representing a classifier using "Arithmetic progression" classification method.
 * @extends AbstractClassifier
 */
class ArithmeticProgressionClassifier extends AbstractClassifier {
  /**
   * Create a classifier using "Arithmetic progression" classification method.
   *
   * @param {number[]} values
   * @param precision
   */
  constructor(values, precision) {
    super(values, precision);
    this.type = "arithmetic";
  }

  /**
   * Classify the series into the given number of classes.
   *
   * @param {number} nClasses - The number of classes to classify the series into.
   * @returns {number[]}
   * @throws {TooFewValuesError}
   */
  classify(nClasses) {
    this.breaks = arithmeticProgression(this._values, {
      nb: nClasses,
      precision: this.precision,
    });
    return this._breaks;
  }
}

export {
  ArithmeticProgressionClassifier,
  CustomBreaksClassifier,
  EqualClassifier,
  GeometricProgressionClassifier,
  HeadTailClassifier,
  JenksClassifier,
  MsdClassifier,
  PrettyBreaksClassifier,
  QuantileClassifier,
  Q6Classifier,
};
