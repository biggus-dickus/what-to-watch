export const isPrimitive = (val) => val !== Object(val);

/**
 * Strip an object of unwanted props immutably.
 * @param {Object} objToCopy
 * @param {Array} excludedProps
 * @return {Object}
 */
export const copyRelevantProps = (objToCopy, excludedProps) => {
  const newObj = {};

  for (let key in objToCopy) {
    if (objToCopy.hasOwnProperty(key) && !excludedProps.includes(key)) {
      newObj[key] = objToCopy[key];
    }
  }

  return newObj;
};
