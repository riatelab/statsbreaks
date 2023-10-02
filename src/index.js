export { breaks } from "./breaks.js";
export { q6 } from "./method-q6";
export { quantile } from "./method-quantile";
export { equal } from "./method-equal";
export { jenks } from "./method-jenks.js";
export { headtail } from "./method-headtail.js";
export { msd } from "./method-msd.js";
export { geometricProgression } from "./method-geometric-progression";
export { arithmeticProgression } from "./method-arithmetic-progression";
export { pretty } from "./method-pretty";
export { nestedMeans } from "./method-nested-means";
export {
  InvalidNumberOfClassesError,
  InvalidPrecisionError,
  ValuesInferiorOrEqualToZeroError,
  TooFewValuesError,
  UnknownMethodError,
} from "./errors.js";
export {
  ArithmeticProgressionClassifier,
  CustomBreaksClassifier,
  EqualClassifier,
  GeometricProgressionClassifier,
  HeadTailClassifier,
  JenksClassifier,
  MsdClassifier,
  NestedMeansClassifier,
  PrettyBreaksClassifier,
  QuantileClassifier,
  Q6Classifier,
} from "./classifier";
