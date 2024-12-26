import {
  getCallList,
  GetCallListRequest,
  GetCallListResponse,
} from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetCallList = ({
  status = 'PENDING',
  page,
  size = 10,
}: GetCallListRequest) => {
  return useInfiniteQuery<GetCallListResponse>({
    queryKey: [QUERY_KEYS.CALL_LIST, status, page, size],
    queryFn: ({ pageParam = 1 }) =>
      getCallList({ status, page: pageParam as number, size }),
    getNextPageParam: (getCallListResponse): number | undefined => {
      const nextPage = getCallListResponse.pagination.currentPage + 1;
      return getCallListResponse.pagination.hasNext ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetCallList;
