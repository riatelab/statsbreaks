import {rounding} from "./rounding.js";
import {q6} from "./method-q6.js";
import {quantile} from "./method-quantile.js";
import {equal} from "./method-equal.js";
import {jenks} from "./method-jenks.js";

export function breaks({ values, method, nb, precision }){
  let breaks;
  switch (method) {
    case "q6":
      breaks = q6(values);
      break;
    case "quantile":
      breaks = quantile(values, nb);
      break;
    case "equal":
      breaks = equal(values, nb);
      break;
    case "jenks":
        breaks = jenks(values, nb);
        break;
  }

if (Number.isInteger(+precision)){
return breaks.map(d => rounding(d, precision))
} else {
return breaks
}


}
