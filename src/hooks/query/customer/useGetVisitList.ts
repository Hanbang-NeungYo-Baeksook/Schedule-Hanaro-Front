import { getVisitList, GetVisitListRequest } from '@/api/customer/visits';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetVisitList = ({ page = 0, size = 0 }: GetVisitListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VISIT_LIST, page, size],
    queryFn: () => getVisitList({ page, size }),
  });
};

export default useGetVisitList;
