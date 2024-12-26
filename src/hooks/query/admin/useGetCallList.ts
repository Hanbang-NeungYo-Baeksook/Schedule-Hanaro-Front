import { getCallList } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { SearchConditions } from '@/pages/Admin';
import { AdminCallListRes } from '@/types/Call';
import { useQuery } from '@tanstack/react-query';

const useGetCallList = (searchConditions: SearchConditions) => {
  const { page, startedAt, endedAt, category, keyword } = searchConditions;

  return useQuery<AdminCallListRes>({
    queryKey: [
      ADMIN_QUERY_KEYS.CALL_LIST,
      { page, startedAt, endedAt, category, keyword },
    ],
    queryFn: () => getCallList({ page, startedAt, endedAt, category, keyword }),
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetCallList;
