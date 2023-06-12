import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { quantil } from "./helpers/quantile";

/**
 * Q6 method
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.round = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 *
 */

export function q6(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let round = isNumber(options.round) ? options.round : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;
  if (6 > data.length) return null;
  let breaks = [
    quantil(data, 0),
    quantil(data, 0.05),
    quantil(data, 0.25),
    quantil(data, 0.5),
    quantil(data, 0.75),
    quantil(data, 0.95),
    quantil(data, 1),
  ];

  if (Number.isInteger(round)) {
    breaks = roundarray(breaks, round);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
