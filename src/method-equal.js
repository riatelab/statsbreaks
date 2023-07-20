import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import {validateNbParameter, validatePrecisionParameter} from './helpers/parameter-validation';
import { TooFewValuesError } from "./errors";

/**
 * Equal method
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
 * @throws {InvalidNumberOfClassesError} - If the number of classes is not valid (not an integer or less than 2).
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 *
 */

export function equal(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = options.nb != null ? validateNbParameter(options.nb) : 5;
  let precision = validatePrecisionParameter(options.precision);
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

  if (precision !== null) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}
