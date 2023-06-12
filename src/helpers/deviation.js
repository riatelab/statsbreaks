import { isNumber } from "./is-number.js";
import { sum } from "./sum.js";
import { mean } from "./mean.js";

function variance(x) {
  let v = x.filter((d) => isNumber(d)).map((a) => +a);
  let m = mean(v);
  return (sum(v.map((d) => (d - m) ** 2)) * 1) / (v.length - 1);
}

export function deviation(x) {
  return Math.sqrt(variance(x));
}
