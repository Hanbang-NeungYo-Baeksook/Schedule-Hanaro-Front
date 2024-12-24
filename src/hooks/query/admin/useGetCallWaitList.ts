import { getCallWaitList } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCallWaitList = () => {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
    queryFn: getCallWaitList,
  });
};

export default useGetCallWaitList;
