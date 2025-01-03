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

export type BranchOrder = 'distance' | 'wait';

export type GetBranchListRequest = {
  latitude: number;
  longitude: number;
  order_by: BranchOrder;
  sectionType?: SectionType;
};

export type GetBranchListResponse = {
  bank_list: BranchData[];
  atm_list: BranchData[];
};

export type GetBranchDetailRequest = {
  branch_id: number;
  latitude: number;
  longitude: number;
};

export type GetBranchDetailResponce = BranchData & {
  visit_id: number;
};

export type TransportType = 'WALK' | 'CAR';

export type SectionType = 'DEPOSIT' | 'PERSONAL_LOAN' | 'OTHERS';
export type SectionTypeKr = '예금' | '개인대출' | '기타';

export type GetBranchRecommendListRequest = {
  latitude: number;
  longitude: number;
  transportType: TransportType;
  sectionType: SectionType;
};

export type BranchRecommendData = {
  branch_id: number;
  branch_name: string;
  address: string;
  distance: number;
  wait_time: number;
  current_num: number;
};

export type GetBranchRecommendListResponse = {
  recommend_list: BranchRecommendData[];
};

export const getBranchList = async (
  getBranchListRequest: GetBranchListRequest
) => {
  return (await apiCall.get(
    BASE_URL,
    getBranchListRequest
  )) as GetBranchListResponse;
};

export const getBranchDetail = async ({
  branch_id,
  ...param
}: GetBranchDetailRequest) => {
  return (await apiCall.get(
    BASE_URL + '/' + branch_id,
    param
  )) as GetBranchDetailResponce;
};

export const getBranchRecommendList = async (
  getBranchRecommendListRequest: GetBranchRecommendListRequest
) => {
  return (await apiCall.get(
    BASE_URL + '/recommend',
    getBranchRecommendListRequest
  )) as GetBranchRecommendListResponse;
};
