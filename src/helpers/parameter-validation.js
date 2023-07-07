import { InvalidNumberOfClassesError } from '../errors';
import { isNumber } from './is-number';

/**
 * Validate the 'nb' parameter and return it if it is valid
 * @param {any} nb
 * @returns {number} - The 'nb' parameter, converted to a number
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

export {
  validateNbParameter,
}