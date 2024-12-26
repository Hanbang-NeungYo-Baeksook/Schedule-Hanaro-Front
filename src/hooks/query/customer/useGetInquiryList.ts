import {
  getInquiryList,
  GetInquiryListRequest,
  GetInquiryListResponse,
} from '@/api/customer/inquires';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetInquiryList = ({
  status = 'PENDING',
  page,
  size = 10,
}: GetInquiryListRequest) => {
  return useInfiniteQuery<GetInquiryListResponse>({
    queryKey: [QUERY_KEYS.CALL_LIST, status, page, size],
    queryFn: ({ pageParam }) =>
      getInquiryList({ status, page: pageParam as number, size }),
    getNextPageParam: (getCallListResponse): number | undefined => {
      const nextPage = getCallListResponse.pagination.currentPage + 1;
      return getCallListResponse.pagination.hasNext ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetInquiryList;
