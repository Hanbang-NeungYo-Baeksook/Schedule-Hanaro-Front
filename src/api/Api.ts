import { ADMIN_ROUTE } from '@/constants/route';
import { postReissueAccessToken } from './admin/auth';

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

let reissueAccessToken = false;

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
      throw handleError(response, { url, method, headers, data, params });
    }

    return response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

const handleError = async (response: Response, requestProps: ConfigProps) => {
  const responseString = await response.clone().text();
  const errorCode = JSON.parse(responseString).bangggoodCode;

  if (response.status === 401 && errorCode === 'EXPIRED_ACCESS_TOKEN') {
    return handleUnauthorizedError(response, requestProps);
  }

  throw new Error(response.statusText);
};

const handleUnauthorizedError = async (
  response: Response,
  requestProps: ConfigProps
) => {
  if (reissueAccessToken) {
    throw new Error(response.statusText);
  }

  reissueAccessToken = true;
  try {
    const accessTokenReissueResult = await postReissueAccessToken();
    if (accessTokenReissueResult && accessTokenReissueResult?.accessToken) {
      reissueAccessToken = false;
      const isAdmin = requestProps.url.startsWith('/admin');
      setToken(
        isAdmin ? 'ADMIN' : 'CUSTOMER',
        accessTokenReissueResult.accessToken
      );
      window.location.href = isAdmin ? ADMIN_ROUTE.online.main : '/';
      return await fetcher(requestProps);
    }
  } catch (err) {
    console.error(err);
    const isAdmin = requestProps.url.startsWith('/admin');
    removeToken(isAdmin ? 'ADMIN' : 'CUSTOMER');
    window.location.href = isAdmin ? ADMIN_ROUTE.login : '/login';
  }
};

const setToken = (type: 'CUSTOMER' | 'ADMIN', token: string) => {
  window.localStorage.setItem(`${type.toLowerCase()}AccessToken`, token);
};

const removeToken = (type: 'CUSTOMER' | 'ADMIN') => {
  window.localStorage.removeItem(`${type.toLowerCase()}AccessToken`);
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
