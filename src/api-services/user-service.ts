import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { pagesListNav, router } from '../index';
import store from '../core/Store';
import { UserResponse } from '../shared/interfaces/UserResponse';
import { getChatsService } from './chat-service';
import { setError } from '../shared/utils/setError';

const params = {
  credentials: 'include',
  mode: 'cors',
};

export const getUserService = async (skipError = false): Promise<UserResponse | undefined> => {
  const http = new HTTPTransport();

  try {
    return http
      .get(`${config.baseUrl}/auth/user`, {})
      .then((response) => JSON.parse(response.response))
      .then(async (data) => {
        console.log('USER SERVICE RESPONSE ===>', data);
        if (data?.id) {
          store.dispatch({
            type: 'USER_INFO',
            user: {
              ...data,
              avatar: data.avatar
                ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}`
                : data.avatar,
            },
          });
          await getChatsService();
        }
        if (!skipError) {
          setError(data?.reason);
        }
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};

export const changeUserProfileService = (formData: Record<string, string>): void => {
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
            user: {
              ...data,
              avatar: data.avatar
                ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}`
                : data.avatar,
            },
          });
          router.go(pagesListNav.profileDetails);
        }
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};

export const changePasswordService = (formData: Record<string, string>): void => {
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
    console.error(error.message);
  }
};

export const changeUserAvatarService = (formData: FormData): void => {
  const http = new HTTPTransport();
  console.log('FORM DATA ===>', formData);
  try {
    http
      .put(`${config.baseUrl}/user/profile/avatar`, {
        ...params,
        data: formData,
      })
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('AVATAR CHANGE RESULT ===>', data);
        if (data?.id) {
          store.dispatch({
            type: 'USER_INFO',
            user: {
              ...data,
              avatar: data.avatar
                ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}`
                : data.avatar,
            },
          });
        }
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserByIdService = (id: number): void => {
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
    console.error(error.message);
  }
};

export const userSearchByLoginService = async (
  formData: Record<string, string>,
): Promise<UserResponse[] | undefined> => {
  const http = new HTTPTransport();

  try {
    return http
      .post(`${config.baseUrl}/user/search`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('USER SEARCH RESULT ===>', data);
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};
