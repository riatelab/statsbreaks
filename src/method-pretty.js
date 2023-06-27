import { isNumber } from './helpers/is-number';
import { roundarray } from './helpers/rounding';
import { min } from './helpers/min';
import { max } from './helpers/max';
import { arange } from './helpers/arange';
import {TooFewValuesError} from './errors';

function prettyNumber(x, rounded = true) {
  let exp = Math.floor(Math.log10(x));
  let f = x / Math.pow(10, exp);
  let nf;
  if (rounded) {
    if (f < 1.5) {
      nf = 1.0;
    } else if (f < 3.0) {
      nf = 2.0;
    } else if (f < 7.0) {
      nf = 5.0;
    } else {
      nf = 10.0;
    }
  } else {
    if (f <= 1.0) {
      nf = 1.0;
    } else if (f <= 2.0) {
      nf = 2.0;
    } else if (f <= 5.0) {
      nf = 5.0;
    } else {
      nf = 10.0;
    }
  }
  return nf * 10.0**exp;
}

/**
 * Pretty breaks method (generate breaks that are equally spaced precision values which cover the range of values
 * in the input array - the breaks are chosen so that they are 1, 2, or 5 times a power of 10).
 * Note that this method can return fewer classes than requested.
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @returns {number[]} - An array of breaks.
 *
 */
export function pretty(data, options = {}) {
  data = data.filter((d) => isNumber(d)).map((x) => +x);
  const precision = isNumber(options.precision) ? options.precision : 2;
  const minmax =
    options.minmax === true || options.minmax == undefined ? true : false;
  const nb = isNumber(options.nb) ? options.nb : 5;
  if (nb > data.length) throw new TooFewValuesError();

  const low = min(data);
  const high = max(data);

  const rg = prettyNumber(high - low, false);
  const d = prettyNumber(rg / (nb - 1), true);

  const minY = Math.floor(low / d) * d;
  const maxY = Math.ceil(high / d) * d;

  let breaks = arange(minY, maxY + 0.5 * d, d);

  if (Number.isInteger(precision)) {
    breaks = roundarray(breaks, precision);
  }
  if (!minmax) {
    breaks = breaks.slice(1, -1);
  }
  return breaks;
}