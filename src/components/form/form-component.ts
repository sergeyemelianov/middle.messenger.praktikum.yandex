import './form-component.scss';
import { Block, Props } from '../../core';
import FormTemplate from './form-component.hbs?raw';
import { formIsValid, validate } from '../../shared/utils/validation.util';
import { pagesListNav, router } from '../../index';
import { AuthEnum } from '../../pages';
import HTTPTransport from '../../core/HTTPTransport';
import { config } from '../../config';

type FormProps = Props & {
  form?: Block;
  type?: AuthEnum;
};

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
    const formInputList = this.children.form.lists.inputList;
    const formData: Record<string, string> = {};

    this.setProps({
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();
          formInputList.forEach((list: Block) => {
            const val = ((list as Block).getContent()?.querySelector('.input') as HTMLInputElement)
              ?.value;
            formData[list.props?.name as string] = val;
            this.setValidationError(list, val);
          });

          if (formIsValid(formInputList)) {
            console.log('formData ===>', formData);

            const http = new HTTPTransport();
            const params = {
              credentials: 'include',
              mode: 'cors', // Работаем с CORS
            };

            if (this.props.type === AuthEnum.signup) {
              try {
                http
                  .post(`${config.baseUrl}/auth/signup`, {
                    ...params,
                    data: formData,
                    headers: {
                      'content-type': 'application/json', // Данные отправляем в формате JSON
                    },
                  })
                  .then((response) => {
                    console.log('RESPONSE', response);
                    return response
                  })
                  .then((data) => {
                    console.log('SIGNUP DATA', data);
                    return data;
                  })
                  .then(() => {
                    http
                      .get(`${config.baseUrl}/auth/user`, params)
                      .then((response) => JSON.parse(response.response))
                      .then((data) => {
                        console.log('USER INFO ===>', data);
                        if (data.id) {
                          router.go(pagesListNav.chatboard)
                        }
                        return data;
                      });
                  });
              } catch (error) {
                this.errorHandler(error);
              }
            }

            if (this.props.type === AuthEnum.login) {
              try {
                http
                  .get(`${config.baseUrl}/auth/user`, params)
                  .then((response) => JSON.parse(response.response))
                  .then((data) => {
                    console.log('USER INFO ===>', data);
                    if (data.id) {
                      router.go(pagesListNav.chatboard)
                    }
                    return data;
                  });
              } catch (error) {
                this.errorHandler(error);
              }
            }
            // ;
          }
        },
      },
    });
  }

  errorHandler(error: number): void {
    switch (error) {
      case 200:
        router.go(pagesListNav.chatboard);
        break;
      case 400:
        console.log('ERROR', error);
        break;
      case 401:
        console.log('ERROR', error);
        break;
      case 500:
        router.go(pagesListNav.error5xx);
        break;
      default:
        break;
    }
  }

  setValidationError(list: Block, val: string): void {
    const validation = validate(list.props?.name, val);
    list.setProps({
      error: validation || '',
      value: val,
    });
  }

  render(): string {
    return FormTemplate;
  }
}
