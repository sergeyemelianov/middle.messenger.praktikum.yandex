import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { pagesListNav, router } from '../index';
import { errorHandler } from './error-handler';
import store from '../core/Store';

export const getUserService = (): void => {
  const http = new HTTPTransport();

  try {
    http
      .get(`${config.baseUrl}/auth/user`, {})
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('USER SERVICE RESPONSE ===>', data);
        if (data?.id) {
          store.dispatch({
            type: 'USER_INFO',
            user: data,
          });
          router.go(pagesListNav.chatboard);
        } else {
          store.dispatch({
            type: 'USER_INFO',
            user: undefined,
          });
          router.go(pagesListNav.login);
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const changeUserProfileService = (
  params: Record<string, string>,
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .put(`${config.baseUrl}/user/profile`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('USER PROFILE UPDATED ===>', data);
        if (data?.id) {
          store.dispatch({
            type: 'USER_INFO',
            user: data,
          });
          router.go(pagesListNav.profileDetails);
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const changePasswordService = (
  params: Record<string, string>,
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .put(`${config.baseUrl}/user/password`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => response)
      .then((data) => {
        console.log('USER PASSWORD UPDATED ===>', data);
        router.go(pagesListNav.profileDetails);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const userSearchService = (
  params: Record<string, string>,
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .put(`${config.baseUrl}/user/profile/avatar`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('USER SEARCH RESULT ===>', data);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const getUserByIdService = (params: Record<string, string>, id: number): void => {
  const http = new HTTPTransport();

  try {
    http
      .get(`${config.baseUrl}/user/:${id}`, params)
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('USER BY ID RESPONSE ===>', data);
        if (data.id) {
          store.dispatch({
            type: 'USER_INFO',
            user: data,
          });
          router.go(pagesListNav.chatboard);
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};
