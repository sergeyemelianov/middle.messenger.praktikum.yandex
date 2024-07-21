import { config } from '../config';
import HTTPTransport from '../core/HTTPTransport';
import { errorHandler } from './error-handler';
import { getUserService } from './user-service';

export const signinService = (
  params: Record<string, string>,
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .post(`${config.baseUrl}/auth/signin`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json', // Данные отправляем в формате JSON
        },
      })
      .then((response) => {
        console.log('RESPONSE IGNIN', response);
        return response;
      })
      .then((data) => {
        console.log('SIGNIN DATA', data);
        return data;
      })
      .then(() => {
        getUserService(params);
      });
  } catch (error) {
    errorHandler(error);
  }
};
