import { isNumber } from './is-number';

/**
 * Median of the values of an array
 *
 * @param {number[]} x - An array of values
 * @returns {number} - Median of values
 */
export function median(x) {
  let v = x.filter(d => isNumber(d)).map(a => +a).sort((a, b) => a - b);
  let mid = Math.floor(v.length / 2);
  return v.length % 2 !== 0 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}