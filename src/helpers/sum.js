import { isNumber } from "./is-number.js";

/**
 * Sum of the values of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Sum of values
 */

export function sum(x) {
  return x
    .filter((d) => isNumber(d))
    .map((a) => +a)
    .reduce((a, b) => +a + +b, 0);
}
