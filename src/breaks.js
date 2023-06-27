import { q6 } from "./method-q6.js";
import { quantile } from "./method-quantile.js";
import { equal } from "./method-equal.js";
import { jenks } from "./method-jenks.js";
import { msd } from "./method-msd.js";
import { geometricProgression } from "./method-geometric-progression.js";
import { headtail } from "./method-headtail.js";
import { pretty } from "./method-pretty";
import { UnknownMethodError } from "./errors.js";

/**
 * Discretization methods
 *
 * Example: {@link https://observablehq.com/@neocartocnrs/hello-statsbreaks Observable notebook}
 *
 * @param {number[]} data - An array of numerical values.
 * @param {object} options - Optional parameters
 * @param {string} [options.method=quantile] - Classification method (quantile, q6, equal, jenks, msd, geometric, headtail)
 * @param {number} [options.nb = 5] - Number of classes desired
 * @param {number} [options.precision = 2] - Number of digits
 * @param {boolean} [options.minmax = true] - To keep or delete min and max
 * @param {number} [options.k = 1] - Number of standard deviations taken into account (msd method only)
 * @param {boolean} [options.middle = true] - To have the average as a class center (msd method only)
 * @returns {number[]} - An array of breaks.
 * @throws {UnknownMethodError} - If the classification method is unknown.
 *
 */

export function breaks(data, options = {}) {
  let method = options.method ? options.method : "quantile";
  let breaks;
  switch (method) {
    case "q6":
      breaks = q6(data, options);
      break;
    case "quantile":
      breaks = quantile(data, options);
      break;
    case "equal":
      breaks = equal(data, options);
      break;
    case "jenks":
      breaks = jenks(data, options);
      break;
    case "msd":
      breaks = msd(data, options);
      break;
    case "geometric":
      breaks = geometricProgression(data, options);
      break;
    case "headtail":
      breaks = headtail(data, options);
      break;
    case "pretty":
      breaks = pretty(data, options);
      break;
    default:
      throw new UnknownMethodError();
  }

  return breaks;
}
