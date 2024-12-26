import { API_ROUTE } from '@/constants/route';
import {
  AdminCustomer,
  AdminCustomerDetail,
  AdminCustomerHistory,
} from '@/types/customer';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/customers';

export const getCustomerList = async (page: number) => {
  return (await apiCall.get(
    BASE_URL + `?page=${page}&size=10`
  )) as AdminCustomer;
};

export const getCustomerDetail = async (customerId: number) => {
  return (await apiCall.get(
    BASE_URL + `/${customerId}`
  )) as AdminCustomerDetail;
};

export const getCustomerHistory = async (customerId: number) => {
  return (await apiCall.get(
    BASE_URL + `/${customerId}/content`
  )) as AdminCustomerHistory;
};
