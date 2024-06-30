export type ValidateSourceType =
  | 'login'
  | 'password'
  | 'first_name'
  | 'second_name'
  | 'email'
  | 'phone'
  | 'message';

const errors = {
  first_name:
    'Латиница или кириллица, первая заглавная, без пробелов, цифр, спецсимволов (можно "-")',
  login:
    '3-20 символов, латиница, цифры, без пробелов, спецсимволов (можно "-" и "_")',
  email: 'Латиница, можно цифры, можно "-" и "_", содержит @',
  password: 'от 8 до 40 символов, одна заглавная буква и цифра',
  phone: '10-15 символов, только цифры, может начинается с плюса',
  message: 'Пустой текст',
};

export const validate = (type: ValidateSourceType, event = ''): string => {
  const loginReg = new RegExp('^(?!\\d+$)[A-Za-z0-9_-]{3,20}$');
  const passwordReg = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$');
  const nameReg = new RegExp('^[A-ZА-ЯЁ][a-zа-яё-]*$');
  const emailReg = new RegExp('.+@.+\\..+');
  const phoneReg = new RegExp('^\\+?\\d{10,15}$');
  const messageReg = new RegExp('^.+$');

  switch (type) {
    case 'login':
      if (!loginReg.test(event)) {
        return errors.login;
      }
      return '';
    case 'password':
      if (!passwordReg.test(event)) {
        return errors.password;
      }
      return '';
    case 'first_name':
    case 'second_name':
      if (!nameReg.test(event)) {
        return errors.first_name;
      }
      return '';
    case 'email':
      if (!emailReg.test(event)) {
        return errors.email;
      }
      return '';
    case 'phone':
      if (!phoneReg.test(event)) {
        return errors.phone;
      }
      return '';
    case 'message':
      if (!messageReg.test(event)) {
        return errors.message;
      }
      return '';
    default:
      return '';
  }
};
