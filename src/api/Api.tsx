import axios from 'axios';
type headersProps = {
  'Content-type': string;
  Authorization: string | null;
};
type configProps = {
  url: string;
  method: string;
  headers: headersProps;
  data: object | null | undefined;
  params: object | null | undefined;
};

// eslint-disable-next-line react-refresh/only-export-components
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

const apiCall = async (
  url: string,
  method = 'get',
  data: null | undefined | object = null
) => {
  try {
    const headers: headersProps = {
      'Content-type': 'application/json',
      Authorization: '',
    };
    const token = window.localStorage.getItem('token');
    console.log(token);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const config: configProps = {
      url,
      method,
      headers,
      data: {},
      params: {},
    };
    if (method.toLowerCase() === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }

    const response = await API(config);
    return response;
  } catch (error) {
    console.error('API call error', error);
    throw error;
  }
};
export default apiCall;
