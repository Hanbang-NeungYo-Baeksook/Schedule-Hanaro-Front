import { getCallList } from '@/api/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Call } from '@/types/call';
import { useQuery } from '@tanstack/react-query';

const useGetCallListQuery = () => {
  return useQuery<Call>({
    queryKey: [QUERY_KEYS.CALL_LIST],
    queryFn: getCallList,
  });
};

export default useGetCallListQuery;
