import { getVisitStatus } from '@/api/admin/visit';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useVisitStatus = (sectionId: number) => {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEYS.VISIT_STATUS_UPDATE, sectionId],
    queryFn: () => getVisitStatus(sectionId),
  });
}; 