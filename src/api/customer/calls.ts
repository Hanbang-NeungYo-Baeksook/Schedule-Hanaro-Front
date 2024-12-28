import { API_ROUTE } from '@/constants/route';
import { SliceData } from '@/types/page';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.customer + '/calls';

export const CATEGORY = [
  '로그인',
  '회원가입',
  '인증',
  '예금',
  '신탁',
  '펀드',
  '대출',
  '외환',
  '인터넷뱅킹',
  '하나원큐',
  '폰뱅킹',
  'CD',
  'ATM',
  '공과금납부',
  '해외',
  '영업점',
] as const;

export type Category = (typeof CATEGORY)[number];

export type Status = 'PENDING' | 'PROGRESS' | 'COMPLETE' | 'CANCELED';
export type StatusKr = '대기중' | '진행중' | '완료' | '취소';

export type CallData = {
  call_id: number;
  call_date: string;
  call_time: string;
  call_num: number;
  category: Category;
  status: StatusKr;
  wait_num: number;
  estimated_wait_time: number;
};

export type GetCallListRequest = {
  status?: Status;
  page?: number;
  size?: number;
};

export type GetCallListResponse = SliceData<CallData[]>;

export type GetCallDetailRequest = {
  call_id: number;
};

export type GetCallDetailResponse = CallData & {
  customer_name: string;
  content: string;
  tags: string[];
};

export type GetCallAvailabilityRequest = {
  date: string;
};

export type TimeSlot = {
  time_slot: string;
  available_slots: number;
};

export type GetCallAvailabilityResponse = {
  data: TimeSlot[];
};

export type PostCallRequest = {
  call_date: string;
  category: Category;
  content: string;
};

export type PostCallResponse = {
  call_id: number;
};

export type DeleteCallRequest = GetCallDetailRequest;

export const getCallList = async ({
  status,
  page,
  size,
}: GetCallListRequest) => {
  const param = { status, page, size };
  return (await apiCall.get(BASE_URL, param)) as GetCallListResponse;
};

export const getCallDetail = async ({ call_id }: GetCallDetailRequest) => {
  return (await apiCall.get(BASE_URL + '/' + call_id)) as GetCallDetailResponse;
};

export const getCallAvailability = async (
  getCallAvailabilityRequest: GetCallAvailabilityRequest
) => {
  return (await apiCall.post(
    BASE_URL + '/availability',
    getCallAvailabilityRequest
  )) as GetCallAvailabilityResponse;
};

export const postCall = async ({
  call_date,
  category,
  content,
}: PostCallRequest) => {
  return (await apiCall.post(BASE_URL, {
    call_date,
    category,
    content,
  })) as PostCallResponse;
};

export const deleteCall = async ({ call_id }: DeleteCallRequest) => {
  return await apiCall.delete(BASE_URL + '/' + call_id);
};
