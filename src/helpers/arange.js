/**
 * Return evenly spaced values within a given interval.
 *
 * @param {number} start - Start of interval
 * @param {number} stop - End of interval
 * @param {number} step [step=1] - Spacing between values
 * @returns {number[]} - Array of values
 */
export function arange(start, stop, step=1) {
  const result = [];
  let i = 0;
  while (start < stop) {
    result[i++] = start;
    start += step;
  }
  return result;
}