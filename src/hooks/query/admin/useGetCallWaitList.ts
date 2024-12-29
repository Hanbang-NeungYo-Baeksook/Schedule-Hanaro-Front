import { getCallWaitList } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCallWaitList = ({
  date,
  time,
}: {
  date?: string;
  time?: string;
}) => {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST, { date, time }],
    queryFn: () => getCallWaitList({ date, time }),
    // enabled: !!date,
  });
};

export default useGetCallWaitList;
