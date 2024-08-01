import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import store from '../core/Store';
import { UserResponse } from '../shared/interfaces/UserResponse';
import { ChatsResponse } from '../shared/interfaces/ChatsResponse';

const params = {
  credentials: 'include',
  mode: 'cors',
};

export const getChatsService = async (): Promise<ChatsResponse[] | undefined> => {
  const http = new HTTPTransport();

  try {
    return http
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
            chats: data,
          });
        }
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};

export const createChatsService = (formData: Record<string, string>): void => {
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
      })
      .then(async () => {
        await getChatsService();
      });
  } catch (error) {
    console.error(error.message);
  }
};

export const addUserToChatService = (userData?: UserResponse[], chatId?: number): void => {
  const http = new HTTPTransport();

  try {
    if (userData?.length) {
      const chatData = {
        users: [userData[0].id],
        chatId,
      };
      http
        .put(`${config.baseUrl}/chats/users`, {
          ...params,
          data: chatData,
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((response) => response)
        .then((data) => {
          console.log('USER ADDED TO CHAT RESULT ===>', data);
          return data;
        });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUserFromChatService = (userData?: UserResponse[], chatId?: number): void => {
  const http = new HTTPTransport();

  try {
    if (userData?.length) {
      const chatData = {
        users: [userData[0].id],
        chatId,
      };
      http
        .delete(`${config.baseUrl}/chats/users`, {
          ...params,
          data: chatData,
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
    }
  } catch (error) {
    console.error(error.message);
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
        return data;
      });
  } catch (error) {
    console.error(error.message);
  }
};
