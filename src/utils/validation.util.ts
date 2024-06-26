export type ValidateSourceType = 'login' | 'password' | 'name' | 'email' | 'phone' | 'message';

export const validate = (type: ValidateSourceType, event = ''): boolean | undefined => {
  const loginReg = new RegExp('^(?!\\d+$)[A-Za-z0-9_-]{3,20}$');
  const passwordReg = new RegExp('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$');
  const nameReg = new RegExp('^[A-ZА-ЯЁ][a-zа-яё-]*$');
  const emailReg = new RegExp('^[A-Za-z0-9_-]+@[A-Za-z]+(\\.[A-Za-z]+)+$\n');
  const phoneReg = new RegExp('^\\+?\\d{10,15}$');
  const messageReg = new RegExp('^.+$');

  switch (type) {
    case 'login':
      console.log('validate ---> login', loginReg.test(event));
      return loginReg.test(event);
    case 'password':
      console.log('validate ---> password', passwordReg.test(event));
      return passwordReg.test(event);
    case 'name':
      console.log('validate ---> name', nameReg.test(event));
      return nameReg.test(event);
    case 'email':
      console.log('validate ---> email', emailReg.test(event));
      return emailReg.test(event);
    case 'phone':
      console.log('validate ---> phone', phoneReg.test(event));
      return phoneReg.test(event);
    case 'message':
      console.log('validate ---> message', messageReg.test(event));
      return messageReg.test(event);
    default:
      return undefined;
  }
};
