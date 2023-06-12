import { isNumber } from "./is-number.js";

/**
 * Find the maximum value of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Maximuym value
 */

export function max(x) {
  return Math.max(...x.filter((d) => isNumber(d)).map((a) => +a));
}
