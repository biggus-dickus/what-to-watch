export const EMAIL_NAME = `email`;
export const PASSWORD_NAME = `password`;

const formFields = [
  {
    htmlFormTag: `input`,
    label: `Email address`,
    type: `email`,
    placeholder: `Email Address`,
    name: EMAIL_NAME,
    id: `user-email`,
    required: true
  },
  {
    htmlFormTag: `input`,
    label: `Password`,
    type: `password`,
    placeholder: `Password`,
    name: PASSWORD_NAME,
    id: `user-password`,
    required: true
  }
];

export default formFields;
