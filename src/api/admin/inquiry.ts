import { API_ROUTE } from '@/constants/route';
import { InquiryReplyParams } from '@/hooks/query/admin/usePostInquiryReply';
import {
  Category,
  CategoryDetails,
  InquiryStatus,
  InquiryStatusDetails,
} from '@/types/enum';
import { AdminInquiry, AdminInquiryDetail } from '@/types/inquiry';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/inquiries';

export type InquirySearchConditions = {
  page: number;
  status?: InquiryStatus;
  category?: Category;
  search_content?: string;
};

export const getInquiryList = async ({
  page,
  status,
  category,
  search_content,
}: InquirySearchConditions) => {
  console.log(category);
  return (await apiCall.get(
    BASE_URL +
      `?page=${page}&size=10${status ? `&status=` + InquiryStatusDetails[status] : ''}${category !== '전체' && category ? `&category=` + CategoryDetails[category] : ''}${search_content ? `&search_content=` + search_content : ''}`
  )) as AdminInquiry;
};

export const getInquiryDetail = async (inquiryId: number) => {
  return (await apiCall.get(BASE_URL + `/${inquiryId}`)) as AdminInquiryDetail;
};

export const postInquiryReply = async ({
  inquiryId,
  body,
}: InquiryReplyParams) => {
  return await apiCall.post(BASE_URL + `/register/${inquiryId}`, body);
};
