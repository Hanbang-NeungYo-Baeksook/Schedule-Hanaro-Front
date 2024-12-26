import { API_ROUTE } from '@/constants/route';
import apiVisit from '../Api';
import { Category } from './calls';

const BASE_URL = API_ROUTE.customer + '/visits';

export type VisitData = {
  visit_id: number;
  branch_id: number;
  branch_name: string;
  x_position: string;
  y_position: string;
  section_type: string;
  visit_num: number;
  current_num: number;
  waiting_amount: number;
  waiting_time: number;
};

export type GetVisitListRequest = {
  page?: number;
  size?: number;
};

export type GetVisitListResponse = PageData<VisitData[], Pagination>;

export type GetVisitDetailRequest = {
  visit_id: number;
};

export type GetVisitDetailResponse = VisitData & {
  current_num: number;
};

export type PostVisitRequest = {
  branch_id: number;
  content: string;
  category: Category;
};

export type PostVisitResponse = {
  visit_id: number;
};

export type DeleteVisitRequest = GetVisitDetailRequest;

export const getVisitList = async ({ page, size }: GetVisitListRequest) => {
  const param =
    page != 0 && size != 0
      ? {
          page,
          size,
        }
      : {};
  return (await apiVisit.get(BASE_URL, param)) as GetVisitListResponse;
};

export const getVisitDetail = async ({ visit_id }: GetVisitDetailRequest) => {
  return (await apiVisit.get(
    BASE_URL + '/' + visit_id
  )) as GetVisitDetailResponse;
};

export const postVisit = async ({
  branch_id,
  category,
  content,
}: PostVisitRequest) => {
  return (await apiVisit.post(BASE_URL, {
    branch_id,
    category,
    content,
  })) as PostVisitResponse;
};

export const deleteVisit = async ({ visit_id }: DeleteVisitRequest) => {
  return await apiVisit.delete(BASE_URL + '/' + visit_id);
};
