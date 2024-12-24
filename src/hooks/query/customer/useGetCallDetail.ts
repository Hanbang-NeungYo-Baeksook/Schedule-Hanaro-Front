import { getCallDetail, GetCallDetailRequest } from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCallDetail = (getCallDetailRequest: GetCallDetailRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALL_DETAIL, getCallDetailRequest],
    queryFn: () => getCallDetail(getCallDetailRequest),
  });
};

export default useGetCallDetail;
