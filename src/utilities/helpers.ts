export const isPrimitive = (val: any): boolean => val !== Object(val);

/**
 * Strip an object of unwanted props immutably.
 * @param {Object} objToCopy
 * @param {Array} excludedProps
 * @return {Object}
 */
export const copyRelevantProps = (objToCopy: any, excludedProps: string[]): any => {
  const newObj = {};

  for (let key in objToCopy) {
    if (objToCopy.hasOwnProperty(key) && !excludedProps.includes(key)) {
      newObj[key] = objToCopy[key];
    }
  }

  return newObj;
};
