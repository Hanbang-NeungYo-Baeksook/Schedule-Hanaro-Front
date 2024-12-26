import { getCurrentVisit } from '@/api/admin/visit';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminVisitStatusUpdateResponse } from '@/types/Visit';
import { useQuery } from '@tanstack/react-query';

const useGetCurrentVisitQuery = (sectionId: number) => {
  return useQuery<AdminVisitStatusUpdateResponse>({
    queryKey: [ADMIN_QUERY_KEYS.CURRENT_VISIT, sectionId],
    queryFn: () => getCurrentVisit(sectionId),
  });
};

export default useGetCurrentVisitQuery; 