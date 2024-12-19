import { getCallWaitList } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminCall } from '@/types/call';
import { useQuery } from '@tanstack/react-query';

const useGetCallWaitListQuery = () => {
  return useQuery<AdminCall>({
    queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
    queryFn: getCallWaitList,
  });
};

export default useGetCallWaitListQuery;
