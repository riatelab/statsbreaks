import { InvalidNumberOfClassesError, InvalidPrecisionError } from '../errors';
import { isNumber } from './is-number';

/**
 * Validate the 'nb' parameter and return it if it is valid
 * @param {any} nb
 * @returns {number} - The 'nb' parameter, converted to a number
 * @throws {InvalidNumberOfClassesError} - If the 'nb' parameter is not valid
 *
 */
function validateNbParameter(nb) {
  // Test that the 'nb' parameter is a number or can be converted to a number
  if (!isNumber(nb)) {
    throw new InvalidNumberOfClassesError("The 'nb' parameter must be a number");
  }
  // Convert the 'nb' parameter to a number if it is a string
  nb = +nb;
  // Test that the 'nb' parameter is an integer
  if (!Number.isInteger(nb)) {
    throw new InvalidNumberOfClassesError("The 'nb' parameter must be an integer");
  }
  // Test that the 'nb' parameter is equal or superior to 2
  if (nb < 2) {
    throw new InvalidNumberOfClassesError("The 'nb' parameter must be superior or equal to 2");
  }
  // Return the 'nb' parameter
  return nb;
}

/**
 * Validate the 'precision' parameter and return it if it is valid
 * @param {any} precision - The 'precision' parameter as passed by the user
 * @returns {number | null} - The 'precision' parameter as a number, or null if the user explicitly set it to null
 * @throws {InvalidPrecisionError} - If the 'precision' parameter is not valid
 */
function validatePrecisionParameter(precision) {
  // If precision is explicitly set to null, return null, because be don't want to round the break values
  if (precision === null) {
    return null;
  }
  // If precision is undefined, return the default value that is currently 2
  // (but this could change in the future to compute the default value from the values)
  if (precision === undefined) {
    return 2;
  }
  // Otherwise, test that the 'precision' parameter is a number or can be converted to a number
  if (!isNumber(precision)) {
    throw new InvalidPrecisionError("The 'precision' parameter must be a number");
  }
  // Convert the 'nb' parameter to a number if it is a string
  precision = +precision;
  // Test that the 'nb' parameter is an integer
  if (!Number.isInteger(precision)) {
    throw new InvalidPrecisionError("The 'precision' parameter must be an integer");
  }
  if (precision < 0) {
    throw new InvalidPrecisionError("The 'precision' parameter must be superior or equal to 0");
  }

  return precision;
}

export {
  validateNbParameter,
  validatePrecisionParameter,
};
