import * as d3array from "d3-array";
const d3 = Object.assign({}, d3array);

export function equal(data, nb){
  data = data.filter((d) => isFinite(d)).map((x) => +x);
  if (nb > data.length) return null;
  const breaks = [d3.min(data), d3.max(data)];
  const r = (breaks[1] - breaks[0]) / nb; // raison
  let tmp = breaks[0];
  for (let i = 0; i < nb - 1; i++) {
    breaks.push(tmp + r);
    tmp = tmp + r;
  }
  return breaks.sort(d3.ascending);
}
