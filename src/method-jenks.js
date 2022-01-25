// from https://github.com/riatelab/magrit/blob/master/client/js/webworker_jenks.js

function breaks(data, lower_class_limits, nb){
  let k = data.length - 1,
    kclass = [],
    countNum = nb;
  kclass[nb] = data[data.length - 1];
  kclass[0] = data[0];
  while (countNum > 1) {
    kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
    k = lower_class_limits[k][countNum] - 1;
    countNum--;
  }
  return kclass;
}

function getMatrices(data, nb){
  let lower_class_limits = [],
    variance_combinations = [],
    i,
    j,
    variance = 0;

  for (i = 0; i < data.length + 1; i++) {
    let tmp1 = [],
      tmp2 = [];
    for (j = 0; j < nb + 1; j++) {
      tmp1.push(0);
      tmp2.push(0);
    }
    lower_class_limits.push(tmp1);
    variance_combinations.push(tmp2);
  }
  for (i = 1; i < nb + 1; i++) {
    lower_class_limits[1][i] = 1;
    variance_combinations[1][i] = 0;
    for (j = 2; j < data.length + 1; j++) {
      variance_combinations[j][i] = Infinity;
    }
  }
  for (let l = 2; l < data.length + 1; l++) {
    let sum = 0,
      sum_squares = 0,
      w = 0,
      i4 = 0;
    for (let m = 1; m < l + 1; m++) {
      let lower_class_limit = l - m + 1,
        val = data[lower_class_limit - 1];

      w++;
      sum += val;
      sum_squares += val * val;
      variance = sum_squares - (sum * sum) / w;
      i4 = lower_class_limit - 1;

      if (i4 === 0) {
        continue;
      }

      for (j = 2; j < nb + 1; j++) {
        if (
          variance_combinations[l][j] >=
          variance + variance_combinations[i4][j - 1]
        ) {
          lower_class_limits[l][j] = lower_class_limit;
          variance_combinations[l][j] =
            variance + variance_combinations[i4][j - 1];
        }
      }
    }
    lower_class_limits[l][1] = 1;
    variance_combinations[l][1] = variance;
  }

  return {
    lower_class_limits: lower_class_limits,
    variance_combinations: variance_combinations
  };
}


export function jenks(data, nb){
  data = data.filter((d) => d != "").map((x) => +x)
  .sort(function (a, b) {
      return a - b;
    });
  if (nb > data.length) return null;
  let matrices = getMatrices(data, nb);
  let lower_class_limits = matrices.lower_class_limits;
  return breaks(data, lower_class_limits, nb);
}
