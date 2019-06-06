export const isEmpty = (value) => !value.trim().length;

export const isValidEmail = (value) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return re.test(value);
};

export const isLength = (value = ``, params = {}) => {
  const {min = 0, max = value.length} = params;
  return value.length >= min && value.length <= max;
};
