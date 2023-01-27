import { min as d3min, max as d3max } from "d3-array";
import { isNumber } from "./is-number";

export function geometricProgression(data, nb) {
    data = data.filter((d) => isNumber(d)).map((x) => +x);
    // With geometric progression, the series of values
    // should not contain negative or zero values.
    if (data.some((d) => d <= 0)) return null;

    const breaks = new Array(nb + 1);
    const min = d3min(data);
    const max = d3max(data);
    const logMax = Math.log(max) / Math.LN10;
    const logMin = Math.log(min) / Math.LN10;
    const logDiff = (logMax - logMin) / nb;

    // The first value is the minimum value.
    breaks[0] = min;

    // Compute the antilogarithm of each log boundary.
    for (let i = 1; i < nb; i++) {
        breaks[i] = Math.pow(10, logMin + i * logDiff);
    }

    // The last value is the maximum value.
    breaks[nb] = max;

    return breaks;
}
