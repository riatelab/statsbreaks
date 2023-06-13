import { isNumber } from "./is-number.js";

/**
 * Find the maximum value of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Maximum value
 */

export function max(x) {
  let maximum = -Infinity;
  for (let i = 0, length = x.length; i < length; i++) {
    if (isNumber(x[i]) && x[i] > maximum) {
      maximum = x[i];
    }
  }

  return maximum;
}
