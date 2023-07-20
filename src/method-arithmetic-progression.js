import { isNumber } from "./helpers/is-number";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { roundarray } from "./helpers/rounding";
import { TooFewValuesError } from "./errors";
import {validateNbParameter, validatePrecisionParameter} from './helpers/parameter-validation';

/**
 * Arithmetic progression
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
 */

export function arithmeticProgression(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = options.nb != null ? validateNbParameter(options.nb) : 5;
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  if (nb > data.length) throw new TooFewValuesError();

  let breaks = [];
  let denominator = 0;

  for (let i = 0; i <= nb; i++) {
    denominator += i;
  }

  let tmpMin = min(data);
  let tmpMax = max(data);
  let step = (tmpMax - tmpMin) / denominator;

  for (let i = 0; i <= nb; i++) {
    if (i === 0) {
      breaks[i] = tmpMin;
    } else if (i === nb) {
      breaks[i] = tmpMax;
    } else {
      breaks[i] = breaks[i - 1] + (i * step);
    }
  }

  if (precision !== null) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }

  return breaks;
}
