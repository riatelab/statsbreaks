import * as d3array from "d3-array";
import * as d3selection from "d3-selection";
import * as d3scale from "d3-scale";
import * as d3shape from "d3-shape";
import {equal} from "./method-equal.js";
import { isNumber } from "./is-number";
const d3 = Object.assign({}, d3array, d3selection, d3scale, d3shape);

export function shape(data, precision = 25, marks = true, log = false) {
  data = data
    .filter((d) => isNumber(d))
    .map((x) => +x)
    .sort(d3.ascending);


if (log == true){
  data = data
    .map((d) => Math.log(d))
    .filter((d) => d != -Infinity)
    .filter((d) => d != Infinity)
}

  // const pScale = d3.scaleLinear().domain([1, 0]).range([data.length, 1]);
  // precision = pScale(precision);

  const w = 1000;
  const h = 200;

  //  const extent = d3.max(data) - d3.min(data);
  //  const step = extent / precision;

  const breaks = equal(data, precision);
  const extent = breaks[1] - breaks[0];
  const values = [];
  for (let i = 0; i < breaks.length - 1; i++) {
    const x = breaks[0] + extent / 2 + i * extent;
    const y = data.filter((d) => d >= breaks[i] && d <= breaks[i + 1]).length;
    values.push({ x: x, y: y });
  }
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([10, w - 10]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(values.map((d) => d.y)), 0])
    .range([10, h - 20]);

  const svg = d3
    .create("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", [0, 0, w, h])
    .attr(
      "style",
      `max-width: 100%; height: auto; height: intrinsic; background-color: white;`
    );

  // Line

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveBasis);

  svg
    .append("path")
    .datum(values)
    .attr("d", line)
    .attr("stroke", "#d14173")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  // marks

  if (marks == true) {
    svg
      .append("g")
      .attr("fill", "white")
      .attr("stroke", "#d14173")
      .selectAll("path")
      .data(values)
      .join("path")
      .attr("d", d3.symbol().size(25).type(d3.symbols[0]))
      .attr(
        "transform",
        (d) =>
          `translate(
       ${xScale(d.x)},
       ${yScale(d.y)})`
      );
  }

  // // Median

  // let median = d3.median(data);
  // svg
  //   .append("line")
  //   .attr("stroke", "blue")
  //   .attr("x1", xScale(median))
  //   .attr("y1", h - 20)
  //   .attr("x2", xScale(median))
  //   .attr("y2", h - 100);

  // // Average

  // let average = d3.mean(data);
  // svg
  //   .append("line")
  //   .attr("stroke", "red")
  //   .attr("x1", xScale(average))
  //   .attr("y1", h - 20)
  //   .attr("x2", xScale(average))
  //   .attr("y2", h - 100);

  // ticks
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

  return svg.node();
}
