import { getVisitDetail, GetVisitDetailRequest } from '@/api/customer/visits';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetVisitDetail = (getVisitDetailRequest: GetVisitDetailRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VISIT_DETAIL, getVisitDetailRequest],
    queryFn: () => getVisitDetail(getVisitDetailRequest),
  });
};

export default useGetVisitDetail;
