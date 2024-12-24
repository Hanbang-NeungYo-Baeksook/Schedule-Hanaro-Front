import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/customers';

export type GetCustomerDetailResponse = {
  name: string;
  authId: string;
  birth: string;
  phoneNum: string;
  callAmount: number;
  inquiryAmount: number;
  visitAmount: number;
};

export const getCustomerDetail = async () => {
  return (await apiCall.get(BASE_URL)) as GetCustomerDetailResponse;
};
