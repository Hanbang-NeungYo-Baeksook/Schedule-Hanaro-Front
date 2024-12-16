import { getCallList } from '@/api/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Call } from '@/types/Call';
import { useQuery } from '@tanstack/react-query';

const useGetCallListQuery = () => {
  return useQuery<Call>({
    queryKey: [QUERY_KEYS],
    queryFn: getCallList,
  });
};

export default useGetCallListQuery;
