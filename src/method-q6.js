import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { quantil } from "./helpers/quantile";
import { TooFewValuesError } from './errors';

/**
 * Q6 method
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 * @throws {TooFewValuesError} - If the number of values is less than the number of classes.
 *
 */

export function q6(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let precision = isNumber(options.precision) ? options.precision : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;
  if (6 > data.length) throw new TooFewValuesError();
  let breaks = [
    quantil(data, 0),
    quantil(data, 0.05),
    quantil(data, 0.25),
    quantil(data, 0.5),
    quantil(data, 0.75),
    quantil(data, 0.95),
    quantil(data, 1),
  ];

  if (Number.isInteger(precision)) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
