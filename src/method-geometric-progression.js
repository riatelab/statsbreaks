import { isNumber } from "./helpers/is-number";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { roundarray } from "./helpers/rounding";
import { ValuesInferiorOrEqualToZeroError } from './errors';

/**
 * Geometric progression
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.round = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 *
 */

export function geometricProgression(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = isNumber(options.nb) ? options.nb : 5;
  let round = isNumber(options.round) ? options.round : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  // With geometric progression, the series of values
  // should not contain negative or zero values.
  if (data.some((d) => d <= 0)) throw new ValuesInferiorOrEqualToZeroError();

  let breaks = new Array(nb + 1);
  const mn = min(data);
  const mx = max(data);
  const logMax = Math.log(mx) / Math.LN10;
  const logMin = Math.log(mn) / Math.LN10;
  const logDiff = (logMax - logMin) / nb;

  // The first value is the minimum value.
  breaks[0] = mn;

  // Compute the antilogarithm of each log boundary.
  for (let i = 1; i < nb; i++) {
    breaks[i] = Math.pow(10, logMin + i * logDiff);
  }

  // The last value is the maximum value.
  breaks[nb] = mx;

  // Output
  breaks = breaks.sort((a, b) => a - b);
  if (Number.isInteger(round)) {
    breaks = roundarray(breaks, round);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
