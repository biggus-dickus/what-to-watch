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

/**
 * Format date string in human readable or local format.
 * @param {string} dateToFormat
 * @param {string} locale
 * @return {Object}
 */
export const formatDate = (dateToFormat: string, locale: string = `en-UK`): {
  comprehensible: string,
  local: string
} => {
  const date = new Date(dateToFormat);

  const formatterWithOptions = new Intl.DateTimeFormat(locale, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  });

  const formatter = new Intl.DateTimeFormat(locale);

  return {
    comprehensible: formatterWithOptions.format(date),
    local: formatter.format(date)
  };
};

export const minToHm = (minutes: number): number[] => {
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;

  return [hh, mm];
};

export const secToHms = (seconds: number): number[] => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds - hh * 3600) / 60);
  const ss = Math.floor(seconds - hh * 3600 - mm * 60);

  return [hh, mm, ss];
};
