import HTTPTransport from '../core/HTTPTransport';
import { config } from '../config';
import { errorHandler } from './error-handler';
import store from '../core/Store';

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
          wsService.initWS(userId, chatId, data?.token);
        }
        return data;
      });
  } catch (error) {
    errorHandler(error);
  }
};

class WsService {
  userId?: number;
  chatId?: number;
  socket: WebSocket;
  private pingInterval: number = 0;

  constructor() {}

  initWS(userId: number, chatId: number, token: string): void {
    this.socket = new WebSocket(`${config.wsUrl}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.updateWsChat();
      this.setPing();
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', JSON.parse(event.data));
      const message = JSON.parse(event.data);

      if (Array.isArray(message)) {
        store.dispatch({
          type: 'CURRENT_CHAT',
          messages: message,
        });
        return;
      }

      if (message.type === 'pong') {
        return;
      }

      this.updateWsChat();
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event.message);
    });
  }

  sendWsMessage(message: unknown): void {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );

    this.updateWsChat();
  }

  updateWsChat(): void {
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  }

  setPing(): void {
    this.pingInterval = window.setInterval(() => {
      this.socket.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
  }

  closeWs(): void {
    this.socket?.close()
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = 0;
    }
  }
}

export const wsService = new WsService();
