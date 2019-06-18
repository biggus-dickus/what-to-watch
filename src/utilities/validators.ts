export const isEmpty = (value: string): boolean => !value.trim().length;

export const isValidEmail = (value: string): boolean => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return re.test(value);
};

interface LengthParams {
  min?: number,
  max?: number
}

export const isLength = (value: string = ``, params: LengthParams = {}): boolean => {
  const {min = 0, max = value.length} = params;
  return value.length >= min && value.length <= max;
};
