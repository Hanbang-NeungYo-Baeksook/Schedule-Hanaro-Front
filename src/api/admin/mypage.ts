import { API_ROUTE } from '@/constants/route';
import { AdminInfo } from '@/types/admin';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/admins';

export const getAdminInfo = async () => {
  return (await apiCall.get(BASE_URL + `/stats`)) as AdminInfo;
};
