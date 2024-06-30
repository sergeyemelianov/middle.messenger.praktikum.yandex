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
    '3-20 символов, латиница, цифры, но не состоять из них, без пробелов, спецсимволов (можно "-" и "_")',
  email: 'Латиница, можно цифры, можно "-" и "_", содержит @',
  password: 'от 8 до 40 символов, одна заглавная буква и цифра',
  phone: '10-15 символов, только цифры, может начинается с плюса',
  message: 'Пустой текст',
};

export const validate = (type: ValidateSourceType, event = ''): string => {
  const loginReg = new RegExp('^(?!\\d+$)[A-Za-z0-9_-]{3,20}$');
  const passwordReg = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$');
  const nameReg = new RegExp('^[A-ZА-ЯЁ][a-zа-яё-]*$');
  const emailReg = new RegExp('^[A-Za-z0-9_-]+@[A-Za-z]+(\\.[A-Za-z]+)+$\n');
  const phoneReg = new RegExp('^\\+?\\d{10,15}$');
  const messageReg = new RegExp('^.+$');

  switch (type) {
    case 'login':
      console.log('validate ---> login', loginReg.test(event));
      if (!loginReg.test(event)) {
        return errors.login;
      }
      return '';
    case 'password':
      console.log('validate ---> password', passwordReg.test(event));
      if (!passwordReg.test(event)) {
        return errors.password;
      }
      return '';
    case 'first_name':
    case 'second_name':
      console.log('validate ---> name', nameReg.test(event));
      if (!nameReg.test(event)) {
        return errors.first_name;
      }
      return '';
    case 'email':
      console.log('validate ---> email', emailReg.test(event));
      if (!emailReg.test(event)) {
        return errors.email;
      }
      return '';
    case 'phone':
      console.log('validate ---> phone', phoneReg.test(event));
      if (!phoneReg.test(event)) {
        return errors.phone;
      }
      return '';
    case 'message':
      console.log('validate ---> message', messageReg.test(event));
      if (!messageReg.test(event)) {
        return errors.phone;
      }
      return '';
    default:
      return '';
  }
};
