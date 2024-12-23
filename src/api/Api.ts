const BASE_URL = 'http://localhost:8080';

type HeadersProps = {
  'Content-Type': string;
  Authorization: string;
};

type ConfigProps = {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  headers?: Partial<HeadersProps>;
  data?: object | null;
  params?: object | null;
};

export type TokenNames = 'adminAccessToken' | 'customerAccessToken';

const fetcher = async ({
  url,
  method,
  headers = {},
  data,
  params,
}: ConfigProps) => {
  try {
    const tokenName: TokenNames = url.startsWith('/admin')
      ? 'adminAccessToken'
      : 'customerAccessToken';

    const token = window.localStorage.getItem(tokenName);

    const defaultHeaders: HeadersProps = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };

    const configHeaders: Record<string, string> = url.startsWith('/api/auth')
      ? {
          ...headers,
          'Content-Type': 'application/json',
        }
      : {
          ...defaultHeaders,
          ...headers,
        };

    let queryString = '';
    if (params && method === 'GET') {
      queryString = `?${new URLSearchParams(params as Record<string, string>).toString()}`;
    }

    const options: RequestInit = {
      method,
      headers: configHeaders,
      credentials: 'include',
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${url}${queryString}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

const apiCall = {
  get(url: string, params?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'GET', params, headers });
  },

  post(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'POST', data, headers });
  },

  delete(url: string, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'DELETE', headers });
  },

  patch(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'PATCH', data, headers });
  },

  put(url: string, data?: object, headers?: Partial<HeadersProps>) {
    return fetcher({ url, method: 'PUT', data, headers });
  },
};

export default apiCall;
