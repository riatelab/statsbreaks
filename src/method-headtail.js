import { extent, mean as d3mean } from "d3-array";
import { isNumber } from "./is-number";

/**
 * Head/tail algorithm v1.0 based on Jiang (2019).
 * @param {Number[]} data - An array of numerical values.
 * @param {Number} nb - Optional number of class. If nb < natural breaks results, upper classes are merged. If nb > natural breaks results, nb is not used and the natural breaks results is returned.
 * @returns {Number[]} An array of break points with min and max.
 */
export function headtail(data, nb) {
    data = data.filter((d) => isNumber(d)).map((x) => +x);

    const [min, max] = extent(data);
  
    // Initiate breaks with min value
    const breaks = [min];
  
    /**
     * A recursive function that calculates the next break point.
     * @param {Number[]} data - An array of numerical values.
     */
    function getBreak(data) {
      // Add mean to breaks value
      const mean = d3mean(data);
      breaks.push(mean);
  
      // Recursive call to get next break point
      const head = data.filter((d) => d > mean);
      while (head.length > 1 && head.length / data.length <= 0.4)
        return getBreak(head);
    }
  
    getBreak(data);
  
    // Handle optional number of class
    if (nb && nb !== null) {
      const diff = nb - breaks.length;
      if (diff < 0) breaks.splice(nb);
    }
  
    // Add max to breaks
    breaks.push(max);

    return breaks;
}
