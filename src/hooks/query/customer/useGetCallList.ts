import { getCallList, GetCallListRequest } from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCallList = ({
  status = 'PENDING',
  page = 0,
  size = 0,
}: GetCallListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALL_LIST, status, page, size],
    queryFn: () => getCallList({ status, page, size }),
  });
};

export default useGetCallList;
