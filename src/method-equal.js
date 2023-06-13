import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { TooFewValuesError } from "./errors";

/**
 * Equal method
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

export function equal(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = isNumber(options.nb) ? options.nb : 5;
  let round = isNumber(options.round) ? options.round : 2;
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;
  if (nb > data.length) throw new TooFewValuesError();
  let breaks = [min(data), max(data)];
  const r = (breaks[1] - breaks[0]) / nb; // raison
  let tmp = breaks[0];
  for (let i = 0; i < nb - 1; i++) {
    breaks.push(tmp + r);
    tmp = tmp + r;
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
