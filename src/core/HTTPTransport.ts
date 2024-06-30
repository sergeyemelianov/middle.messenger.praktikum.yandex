enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPOptions = {
  method: METHODS;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPMethodType = (url: string, options: HTTPOptions) => Promise<XMLHttpRequest>;

function queryStringify(data: { [key: string | number]: string }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

export default class HTTPTransport {
  get: HTTPMethodType = (url, options) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post: HTTPMethodType = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: HTTPMethodType = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: HTTPMethodType = (url: string, options) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: HTTPOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
