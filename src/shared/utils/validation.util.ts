import { Block } from '../../core';
import { ValidateSourceType } from '../types/ValidateSourceType';

const errors = {
  first_name:
    'Latin or Cyrillic, first letter capitalized, no spaces, digits, or special characters (hyphen allowed)',
  login:
    '3-20 characters, Latin letters, digits, no spaces, no special characters (hyphen and underscore allowed)',
  email: 'Latin letters, digits allowed, hyphen and underscore allowed, must contain @',
  password: '8 to 40 characters, one uppercase letter and one digit',
  phone: '10-15 characters, digits only, can start with a plus sign',
  message: 'Empty text',
};

export const validate = (type: ValidateSourceType | undefined, event = ''): string => {
  if (!type) {
    return '';
  }

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

export const formIsValid = (form: Block[]): boolean => {
  return form.every((element: Block) => !element.props.error);
};
