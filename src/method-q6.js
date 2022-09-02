import * as d3array from "d3-array";
const d3 = Object.assign({}, d3array);

export function q6(data){
  data = data.filter((d) => isFinite(d)).map((x) => +x);
  if (6 > data.length) return null;
  const breaks = [
    d3.quantile(data, 0),
    d3.quantile(data, 0.05),
    d3.quantile(data, 0.25),
    d3.quantile(data, 0.5),
    d3.quantile(data, 0.75),
    d3.quantile(data, 0.95),
    d3.quantile(data, 1)
  ];
  return breaks;
}
