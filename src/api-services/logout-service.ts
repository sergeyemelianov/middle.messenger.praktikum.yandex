import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { pagesListNav, router } from '../index';

export const logoutService = (): void => {
  const http = new HTTPTransport();

  try {
    http
      .post(`${config.baseUrl}/auth/logout`, {})
      .then((response) => response)
      .then((data) => {
        console.log('LOGOUT ===>', data);
        router.go(pagesListNav.login);
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};
