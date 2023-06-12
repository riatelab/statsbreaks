import { isNumber } from "./is-number.js";

/**
 * Mean of the values of an array
 * @param {Number[]} x - An array of values
 * @returns {Number} - Mean of values
 */
export function mean(x) {
  let v = x.filter((d) => isNumber(d)).map((a) => +a);
  return v.reduce((a, b) => +a + +b, 0) / v.length;
}
