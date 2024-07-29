import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { errorHandler } from './error-handler';

const params = {
  credentials: 'include',
  mode: 'cors',
};

export const requestChatToken = (userId: number, chatId: number): void => {
  const http = new HTTPTransport();

  try {
    http
      .post(`${config.baseUrl}/chats/token/${chatId}`, {
        ...params,
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response.response))
      .then((data) => {
        console.log('REQUEST CHAT TOKEN RESPONSE ===>', data);

        if (data?.token) {
          initWS(userId, chatId, data?.token);
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

export const initWS = (userId: number, chatId: number, token: string): void => {
  const socket = new WebSocket(`${config.wsUrl}/${userId}/${chatId}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    socket.send(
      JSON.stringify({
        content: 'Моё первое сообщение миру!',
        type: 'message',
      }),
    );
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event.message);
  });
};
