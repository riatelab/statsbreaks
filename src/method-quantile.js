import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { quantil } from "./helpers/quantile";

/**
 * Classification by quantiles
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

export function quantile(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = isNumber(options.nb) ? options.nb : 5;
  let round = isNumber(options.round) ? options.round : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  if (nb > data.length) return null;
  let breaks = [];
  const q = 1 / nb;
  for (let i = 0; i <= nb; i++) {
    breaks.push(quantil(data, q * i));
  }

  breaks = breaks.sort((a, b) => a - b);
  if (Number.isInteger(round)) {
    breaks = roundarray(breaks, round);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
