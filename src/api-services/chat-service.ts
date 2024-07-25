import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { errorHandler } from './error-handler';
import { UsersRequest } from '../shared/interfaces/UsersRequest';
import store from '../core/Store';

const params = {
  credentials: 'include',
  mode: 'cors',
};

export const getChatsService = (): void => {
  const http = new HTTPTransport();

  try {
    http
      .get(`${config.baseUrl}/chats`, {
        ...params,
      })
      .then((response) => {
        return JSON.parse(response.response);
      })
      .then((data) => {
        console.log('CHATS RESPONSE ===>', data);
        if (data) {
          store.dispatch({
            type: 'CHATS',
            chats: data
          })
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const createChatsService = (
  formData: Record<string, string>,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .post(`${config.baseUrl}/chats`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log('CREATE CHATS RESPONSE ===>', data);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const addUserToChatService = (
  formData: UsersRequest,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .put(`${config.baseUrl}/chats/users`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log('USER ADDED TO CHAT ===>', data);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteUserFromChatService = (
  formData: UsersRequest,
): void => {
  const http = new HTTPTransport();

  try {
    http
      .put(`${config.baseUrl}/chats/users`, {
        ...params,
        data: formData,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log('USER DELETED FROM CHAT ===>', data);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const getCommonChatService = (id: number): void => {
  const http = new HTTPTransport();

  try {
    http
      .get(`${config.baseUrl}/chats/${id}/common`, {
        ...params,
      })
      .then((response) => {
        return JSON.parse(response.response);
      })
      .then((data) => {
        console.log('COMMON CHAT RECEIVED ===>', data);
        if (data) {
          store.dispatch({
            type: 'CURRENT_CHAT',
            messages: data
          })
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};
