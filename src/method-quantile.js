import * as d3array from "d3-array";
const d3 = Object.assign({}, d3array);

export function quantile(data, nb) {
  data = data.filter((d) => d != "").map((x) => +x);
  if (nb > data.length) return null;
  const breaks = [];
  const q = 1 / nb;
  for (let i = 0; i <= nb; i++) {
    breaks.push(d3.quantile(data, q * i));
  }
  return breaks;
}
