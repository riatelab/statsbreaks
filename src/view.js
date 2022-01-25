import * as d3array from "d3-array";
import * as d3selection from "d3-selection";
import * as d3scale from "d3-scale";
import * as d3shape from "d3-shape";
const d3 = Object.assign({}, d3array, d3selection, d3scale, d3shape);

export function view(breaks, cols = null, data = null) {
  const w = 1000;
  let h = data == null ? 25 : 40;

  const svg = d3
    .create("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", [0, 0, w, h])
    .attr(
      "style",
      `max-width: 100%; height: auto; height: intrinsic; background-color: white;`
    );

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(breaks), d3.max(breaks)])
    .range([10, w - 10]);

  // ticks

  if (data != null) {
    data = data
      .filter((d) => d != "")
      .map((x) => +x)
      .sort(d3.ascending);
    svg
      .append("g")
      .attr("stroke", "black")
      .selectAll("line")
      .data(data)
      .join("line")
      .attr("x1", (d) => xScale(d))
      .attr("y1", h)
      .attr("x2", (d) => xScale(d))
      .attr("y2", h - 10);
  }

  for (let i = 0; i <= breaks.length - 1; i++) {
    svg
      .append("rect")
      .attr("x", xScale(breaks[i]))
      .attr("y", 0)
      .attr("width", xScale(breaks[i + 1] - breaks[i]))
      .attr("height", data === null ? h : h - 15)
      .attr("fill", cols === null ? "#d14173" : cols[i])
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);
  }

  return svg.node();
}
