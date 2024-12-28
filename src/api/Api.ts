import { APIError, ErrorCode } from './Error';

const BASE_URL = import.meta.env.VITE_API_URL;

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

export type AccessTokenNames = 'adminAccessToken' | 'customerAccessToken';
export type RefreshTokenNames = 'adminRefreshToken' | 'customerRefreshToken';

const fetcher = async ({
  url,
  method,
  headers = {},
  data,
  params,
}: ConfigProps) => {
  const tokenName: AccessTokenNames = url.startsWith('/admin')
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
    const errorBody = await response.json();
    if (errorBody.code === ErrorCode.EXPIRED_ACCESS_TOKEN) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const defaultHeaders: HeadersProps = {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        };

        const configHeaders: Record<string, string> = url.startsWith(
          '/api/auth'
        )
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

        const response = await fetch(
          `${BASE_URL}${url}${queryString}`,
          options
        );

        if (!response.ok) {
          throw handleError(errorBody);
        }

        return response.json();
      }
    }
    throw handleError(errorBody);
  }

  return response.json();
};

const handleError = (errorBody: APIError) => {
  throw {
    code: errorBody?.code || 'Unknown Code',
    message: errorBody?.message || 'Unknown Error',
  };
};

const refreshAccessToken = async (): Promise<string | null> => {
  const tokenName: AccessTokenNames = 'customerAccessToken';
  try {
    const response = await fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      credentials: 'include', // Refresh Token은 HttpOnly 쿠키에서 처리
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const { accessToken } = await response.json();
    localStorage.setItem(tokenName, accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // 로그아웃 또는 추가 처리
    localStorage.removeItem('accessToken');
    return null;
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
