import * as d3array from "d3-array";
const d3 = Object.assign({}, d3array);

export function msd(data, k = 1, middle = false) {
  data = data.filter((d) => isFinite(d)).map((x) => +x);

  const min = d3.min(data);
  const max = d3.max(data);
  const avg = d3.mean(data);
  const sd = d3.deviation(data);

  const breaks = [min, max];

  if (middle == true) {
    let i = avg + (k / 2) * sd;
    while (i < max) {
      breaks.push(i);
      i = i + sd * k;
    }
    i = avg - (k / 2) * sd;
    while (i > min) {
      breaks.push(i);
      i = i - sd * k;
    }
  } else {
    breaks.push(avg);
    let i = avg + sd * k;
    while (i < max) {
      breaks.push(i);
      i = i + sd * k;
    }
    i = avg - sd * k;
    while (i > min) {
      breaks.push(i);
      i = i - sd * k;
    }
  }

    return breaks.sort(d3.ascending);
  }
