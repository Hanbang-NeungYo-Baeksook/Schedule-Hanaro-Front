import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/auth';

export type PostLoginRequest = {
  authId: string;
  password: string;
};

export type PostLoginResponse = {
  accessToken: string;
};

export const postLogin = async ({ authId, password }: PostLoginRequest) => {
  return (await apiCall.post(BASE_URL + '/sign-in', {
    authId,
    password,
  })) as PostLoginResponse;
};
