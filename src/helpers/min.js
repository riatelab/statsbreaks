import { isNumber } from "./is-number.js";

/**
 * Find the minimum value of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Minimum value
 */

export function min(x) {
  let minimum = Infinity;
  for (let i = 0, length = x.length; i < length; i++) {
    if (isNumber(x[i]) && x[i] < minimum) {
      minimum = x[i];
    }
  }

  return minimum;
}