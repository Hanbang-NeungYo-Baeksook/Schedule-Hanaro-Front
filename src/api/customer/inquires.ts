import { API_ROUTE } from '@/constants/route';
import apiCall from '../Api';
import { Category } from './calls';

const BASE_URL = API_ROUTE.customer + '/inquiries';

export type InquiryData = {
  inquiry_id: number;
  inquiry_num: number;
  category: Category;
  status: InquiryStatus;
};

export type InquiryStatus = 'PENDING' | 'REGISTRATIONCOMPLETE';

export type GetInquiryListRequest = {
  status?: InquiryStatus;
  page?: number;
  size?: number;
};

export type GetInquiryListResponse = PageData<InquiryData[], Pagination>;

export type GetInquiryDetailRequest = {
  inquiry_id: number;
};

export type GetInquiryDetailResponce = InquiryData & {
  customer_name: string;
  content: string;
  tags: string[];
};

export type PostInquiryRequest = {
  category: Category;
  content: string;
};

export type PostInquiryResponse = {
  inquiry_id: number;
};

export type DeleteInquiryRequest = GetInquiryDetailRequest;

export type GetInquiryReplyRequest = GetInquiryDetailRequest;

export type GetInquiryReplyResponse = {
  content: string;
  status: InquiryStatus;
  reply: string;
  tags: string[];
};

export const getInquiryList = async ({
  status,
  page,
  size,
}: GetInquiryListRequest) => {
  const param =
    status && page != 0 && size != 0
      ? {
          status,
          page,
          size,
        }
      : status
        ? {
            status,
          }
        : {};
  return (await apiCall.get(BASE_URL, param)) as GetInquiryListResponse;
};

export const getInquiryDetail = async ({
  inquiry_id,
}: GetInquiryDetailRequest) => {
  return (await apiCall.get(
    BASE_URL + '/' + inquiry_id
  )) as GetInquiryDetailResponce;
};

export const postInquiry = async ({
  category,
  content,
}: PostInquiryRequest) => {
  console.log(content);
  return (await apiCall.post(BASE_URL, {
    category,
    content,
  })) as PostInquiryResponse;
};

export const deleteInquiry = async ({ inquiry_id }: DeleteInquiryRequest) => {
  return await apiCall.delete(BASE_URL + '/' + inquiry_id);
};

export const getInquiryReply = async ({
  inquiry_id,
}: GetInquiryReplyRequest) => {
  return (await apiCall.get(
    BASE_URL + '/' + inquiry_id + '/reply'
  )) as GetInquiryReplyResponse;
};
