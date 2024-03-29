/**
 * Values inferior or equal to zero error (for geometric progression).
 */
class ValuesInferiorOrEqualToZeroError extends Error {
  constructor() {
    super('Values must be superior or equal to zero');
    this.name = 'ValuesInferiorOrEqualToZeroError';
  }
}

/**
 * Too few values error (when the number of breaks is superior to the number of values).
 */
class TooFewValuesError extends Error {
  constructor() {
    super('Too few values for the given number of breaks');
    this.name = 'TooFewValuesError';
  }
}

/**
 * Unknown method error (when the classification method is not recognized).
 */
class UnknownMethodError extends Error {
  constructor() {
    super("Unknown classification method");
    this.name = 'UnknownMethodError';
  }
}

class InvalidNumberOfClassesError extends Error {
  constructor(message) {
    super(message || "Invalid number of classes");
    this.name = 'InvalidNumberOfClassesError';
  }
}

class InvalidPrecisionError extends Error {
  constructor(message) {
    super(message || "Invalid precision");
    this.name = 'InvalidPrecisionError';
  }
}

export {
  InvalidNumberOfClassesError,
  InvalidPrecisionError,
  ValuesInferiorOrEqualToZeroError,
  TooFewValuesError,
  UnknownMethodError,
};