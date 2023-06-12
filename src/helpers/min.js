import { isNumber } from "./is-number.js";

/**
 * Find the minimum value of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Minimum value
 */

export function min(x) {
  return Math.min(...x.filter((d) => isNumber(d)).map((a) => +a));
}
