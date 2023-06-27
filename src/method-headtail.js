import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { mean } from "./helpers/mean";

/**
 * Head/tail algorithm v1.0 based on Jiang (2019).
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 * @throws {TooFewValuesError} - If the number of values is less than the number of classes.
 *
 */

export function headtail(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = isNumber(options.nb) ? options.nb : 5;
  let precision = isNumber(options.precision) ? options.precision : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  // Initiate breaks with min value
  let breaks = [min(data)];

  /**
   * A recursive function that calculates the next break point.
   * @param {Number[]} data - An array of numerical values.
   */
  function getBreak(data) {
    // Add mean to breaks value
    const avg = mean(data);
    breaks.push(avg);

    // Recursive call to get next break point
    const head = data.filter((d) => d > avg);
    while (head.length > 1 && head.length / data.length <= 0.4)
      return getBreak(head);
  }

  getBreak(data);

  // Handle optional number of class
  if (nb && nb !== null) {
    const diff = nb - breaks.length;
    if (diff < 0) breaks.splice(nb);
  }

  // Add max to breaks
  breaks.push(max(data));

  // Output
  if (Number.isInteger(precision)) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }

  if (Number.isInteger(precision)) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
