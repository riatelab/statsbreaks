import { InvalidNumberOfClassesError, TooFewValuesError } from './errors';
import { isNumber } from './helpers/is-number';
import { max } from "./helpers/max";
import { mean } from "./helpers/mean";
import { min } from "./helpers/min";
import { validateNbParameter, validatePrecisionParameter } from './helpers/parameter-validation';
import { roundarray } from './helpers/rounding';

function isPowerOfTwo(n) {
  return n && n !== 0 && (n & (n - 1)) === 0;
}

/**
 * Classification based on nested (arithmetical) means.
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters.
 * @param {number} [options.nb = 4] - Number of classes desired - have to be a power of 2.
 * @param {number} [options.precision = 2] - Number of digits.
 * @param {boolean} [options.minmax = true] - To keep or delete min and max.
 * @returns {number[]} - An array of breaks.
 * @throws {InvalidNumberOfClassesError} - If the number of classes is not valid (not an integer or less than 2).
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 * @throws {TooFewValuesError} - If the number of values is less than the number of classes.
 *
 */
export function nestedMeans(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let nb = options.nb != null ? validateNbParameter(options.nb) : 4;
  if (!isPowerOfTwo(nb)) {
    throw new InvalidNumberOfClassesError(
      "The 'nb' parameter must be a power of 2"
    );
  }
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  if (nb > data.length) throw new TooFewValuesError();

  let means = [];
  let extent = [min(data), max(data)];
  let computeMean = (extent) => mean(data.filter((d) => d >= extent[0] && d <= extent[1]));

  while (means.length + 1 < nb) {
    let exts = [extent[0], ...means, extent[1]].reduce((out, m, i, arr) => {
      if (i < arr.length - 1) {
        out.push([arr[i], arr[i + 1]]);
      }
      return out;
    }, []);
    means = means.concat(exts.map(ext => computeMean(ext))).sort((a, b) => a - b);
  }

  let breaks = means.sort((a, b) => a - b);

  if (minmax) {
    breaks = [extent[0], ...breaks, extent[1]];
  }

  if (precision !== null) {
    breaks = roundarray(breaks, precision);
  }

  return breaks;
}
