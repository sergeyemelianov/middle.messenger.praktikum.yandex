import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { errorHandler } from './error-handler';
import { UsersRequest } from '../shared/interfaces/UsersRequest';
import { CreateChatRequest } from '../shared/interfaces/CreateChatRequest';

export const getChatsService = (params: Record<string, string>): void => {
  const http = new HTTPTransport();

  try {
    http
      .get(`${config.baseUrl}/chats`, {
        ...params,
      })
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log('CHATS RESPONSE ===>', data);
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const createChatsService = (
  params: Record<string, string>,
  formData: CreateChatRequest,
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
  params: Record<string, string>,
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
  params: Record<string, string>,
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
