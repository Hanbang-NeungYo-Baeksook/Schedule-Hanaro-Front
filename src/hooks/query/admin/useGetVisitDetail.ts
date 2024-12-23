import { getVisitDetail } from '@/api/admin/visit';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminVisitInquiryInfoResponse } from '@/types/Visit';
import { useQuery } from '@tanstack/react-query';

const useGetVisitDetailQuery = (visitId: number) => {
  return useQuery<AdminVisitInquiryInfoResponse>({
    queryKey: [ADMIN_QUERY_KEYS.VISIT_DETAIL, visitId],
    queryFn: () => getVisitDetail(visitId),
  });
};

export default useGetVisitDetailQuery; 