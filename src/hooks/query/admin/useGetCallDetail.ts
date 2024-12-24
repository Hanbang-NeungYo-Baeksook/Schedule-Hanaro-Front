import { getCallDetail } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminCallDetail } from '@/types/Call';
import { useQuery } from '@tanstack/react-query';

const useGetCallDetail = (callId: number) => {
  return useQuery<AdminCallDetail>({
    queryKey: [ADMIN_QUERY_KEYS.CALL_DETAIL, callId],
    queryFn: () => getCallDetail({ callId }),
  });
};

export default useGetCallDetail;
