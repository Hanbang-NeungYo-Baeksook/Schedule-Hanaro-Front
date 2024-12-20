import { API_ROUTE } from '@/constants/route';
import { Call } from '@/types/call';
import apiCall from './Api';

const BASE_URL = API_ROUTE.customer + '/calls';

export const getCallList = async () => {
  return (await apiCall.get(BASE_URL)) as Call;
};
