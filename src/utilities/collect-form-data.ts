import {FormField} from '../types'; // eslint-disable-line

/**
 * Generate an object of `key: 'value'` pairs from the form model
 * to create a state for the controlled component.
 * @param {Array} fields
 * @return {Object}
 */
export default function collectFormData(fields: Array<FormField>) {
  const formData = {};

  const names = fields.map((field) => field.name);
  for (const [i, name] of names.entries()) {
    formData[name] = fields[i].value || ``;
  }

  return formData;
}
