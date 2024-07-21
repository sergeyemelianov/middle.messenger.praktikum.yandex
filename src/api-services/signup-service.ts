import { config } from '../config';
import HTTPTransport from '../core/HTTPTransport';
import { errorHandler } from './error-handler';
import { getUserService } from './user-service';

export const signupService = (
  params: Record<string, string>,
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

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
        return response;
      })
      .then((data) => {
        console.log('SIGNUP DATA', data);
        return data;
      })
      .then(() => {
        getUserService(params);
      });
  } catch (error) {
    errorHandler(error);
  }
};
