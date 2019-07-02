export const isEmpty = (value: string): boolean => !value.trim().length;

const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const isValidEmail = (value: string): boolean => emailRe.test(value);

interface LengthParams {
  min?: number,
  max?: number
}

export const isLength = (value: string = ``, params: LengthParams = {}): boolean => {
  const {min = 0, max = value.length} = params;
  return value.length >= min && value.length <= max;
};
