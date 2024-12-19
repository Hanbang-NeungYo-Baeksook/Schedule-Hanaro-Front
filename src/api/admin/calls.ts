import { API_ROUTE } from '@/constants/route';
import { CallMemoParams } from '@/hooks/query/admin/usePostCallMemo';
import { AdminCall } from '@/types/call';
import apiCall from '../Api';

const BASE_URL = API_ROUTE.admin + '/calls';

export const getCallWaitList = async () => {
  return (await apiCall.get(BASE_URL + '/wait')) as AdminCall;
};

export const postCallMemo = async ({ callId, body }: CallMemoParams) => {
  return await apiCall.post(BASE_URL + `/${callId}`, body);
};
