import { config } from '../config';
import HTTPTransport from '../core/HTTPTransport';
import { getUserService } from './user-service';
import { setError } from '../shared/utils/setError';
import { pagesListNav, router } from '../index';

const params = {
  credentials: 'include',
  mode: 'cors',
};

export const signupService = (formData: Record<string, string>): void => {
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
        if (response.status !== 200) {
          const res = JSON.parse(response.response)
          setError(res?.reason)
        }
        return response;
      })
      .then(async (response) => {
        if (response.status === 200) {
          router.go(pagesListNav.chatboard)
          await getUserService();
        }
      });
  } catch (error) {
    console.error(error.message);
  }
};
