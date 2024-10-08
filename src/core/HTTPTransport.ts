export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPOptions = {
  method?: METHODS;
  credentials?: string;
  mode?: string;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPMethodType = (url: string, options?: HTTPOptions) => Promise<XMLHttpRequest>;

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function queryStringify(data: PlainObject) {
  let result = '?';

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'object') {
      result += `${key}=${value?.toString()}&`;
    }
  }

  return result.slice(0, result.length - 1);
}

export default class HTTPTransport {
  get: HTTPMethodType = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET }, options?.timeout);

  post: HTTPMethodType = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST }, options?.timeout);

  put: HTTPMethodType = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);

  delete: HTTPMethodType = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);

  request = (url: string, options: HTTPOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as PlainObject)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;
      if (data instanceof FormData) {
        xhr.send(data);
      } else if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
