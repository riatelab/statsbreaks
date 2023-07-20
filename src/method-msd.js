import { isNumber } from "./helpers/is-number";
import { roundarray } from "./helpers/rounding";
import { min } from "./helpers/min";
import { max } from "./helpers/max";
import { mean } from "./helpers/mean";
import { deviation } from "./helpers/deviation";
import {validatePrecisionParameter} from './helpers/parameter-validation';

/**
 * Classification based on mean and standard deviation
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.k = 1] - Number of standard deviations taken into account
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.middle = true] - To have the average as a class center
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 * @throws {InvalidPrecisionError} - If the precision is not valid (not null, not an integer or less than 0).
 *
 */

export function msd(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  let k = isNumber(options.k) ? options.k : 1;
  let middle =
    options.middle === false || options.middle == undefined ? false : true;
  let precision = validatePrecisionParameter(options.precision);
  let minmax =
    options.minmax === true || options.minmax == undefined ? true : false;

  const mn = min(data);
  const mx = max(data);
  const avg = mean(data);
  const sd = deviation(data);

  let breaks = [mn, mx];

  if (middle == true) {
    let i = avg + (k / 2) * sd;
    while (i < mx) {
      breaks.push(i);
      i = i + sd * k;
    }
    i = avg - (k / 2) * sd;
    while (i > mn) {
      breaks.push(i);
      i = i - sd * k;
    }
  } else {
    breaks.push(avg);
    let i = avg + sd * k;
    while (i < mx) {
      breaks.push(i);
      i = i + sd * k;
    }
    i = avg - sd * k;
    while (i > min) {
      breaks.push(i);
      i = i - sd * k;
    }
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
