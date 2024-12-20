import { API_ROUTE } from '@/constants/route';
import apiCall from './Api';

const BASE_URL = API_ROUTE.customer + '/auth';

export const postLogin = async ({
  authId,
  password,
}: {
  authId: string;
  password: string;
}) => {
  return await apiCall.post(BASE_URL + '/sign-in', { authId, password });
};
