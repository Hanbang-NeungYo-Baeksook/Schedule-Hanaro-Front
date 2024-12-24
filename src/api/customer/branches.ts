import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/branches';

export type BranchType = '방문점' | 'ATM';

export type BranchData = {
  branch_id: number;
  branch_name: string;
  address: string;
  tel: string;
  business_hours: string;
  x_position: string;
  y_position: string;
  branch_type: BranchType;
  distance: number;
  section_types?: string[];
  wait_amount?: number[];
  wait_time?: number[];
  reserved?: boolean;
};

export type GetBranchListRequest = {
  latitude: number;
  longitude: number;
};

export type GetBranchListResponse = {
  bank_list: BranchData[];
  atm_list: BranchData[];
};

export type GetBranchDetailRequest = {
  branch_id: number;
};

export type GetBranchDetailResponce = BranchData;

export const getBranchList = async ({
  latitude,
  longitude,
}: GetBranchListRequest) => {
  const param = { latitude, longitude };
  return (await apiCall.get(BASE_URL, param)) as GetBranchListResponse;
};

export const getBranchDetail = async ({
  branch_id,
}: GetBranchDetailRequest) => {
  return (await apiCall.get(
    BASE_URL + '/' + branch_id
  )) as GetBranchDetailResponce;
};
