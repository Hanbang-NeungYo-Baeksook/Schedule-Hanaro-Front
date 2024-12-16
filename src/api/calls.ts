import { Call } from '@/types/Call';
import apiCall from './Api';

export const getCallList = async () => {
  const response = await apiCall('/calls');
  const { data } = response;
  return data as Call;
};
