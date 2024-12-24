import { API_ROUTE } from '@/constants/route';
import { CallMemoParams } from '@/hooks/query/admin/usePostCallMemo';
import { SearchConditions } from '@/pages/Admin';
import { AdminCall, AdminCallDetail, AdminCallListRes } from '@/types/Call';
import dayjs from 'dayjs';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/calls';

export const getCallWaitList = async () => {
  return (await apiCall.get(BASE_URL + '/wait')) as AdminCall;
};

export const postCallMemo = async ({ callId, body }: CallMemoParams) => {
  return await apiCall.post(BASE_URL + `/${callId}`, body);
};

export const getCallList = async ({
  page = 1,
  startedAt,
  endedAt,
  category,
  keyword,
}: SearchConditions) => {
  return (await apiCall.get(
    BASE_URL +
      `?status=COMPLETE&page=${page}&size=5${startedAt ? '&startedAt=' + dayjs(startedAt).format('YYYY-MM-DD') : ''}${endedAt ? '&endedAt=' + dayjs(endedAt).format('YYYY-MM-DD') : ''}${category ? '&category=' + category : ''}${keyword ? '&keyword=' + keyword : ''}`
  )) as AdminCallListRes;
};

export const getCallDetail = async ({ callId }: { callId: number }) => {
  return (await apiCall.get(BASE_URL + `/${callId}`)) as AdminCallDetail;
};

export const patchCallProgress = async () => {
  return (await apiCall.patch(BASE_URL + '/progress')) as number;
};

export const patchCallComplete = async ({ callId }: { callId: number }) => {
  return (await apiCall.patch(BASE_URL + `/${callId}`)) as string;
};
