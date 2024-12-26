import { updateVisitStatus } from '@/api/admin/visit';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminVisitStatusUpdateResponse } from '@/types/Visit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateVisitStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AdminVisitStatusUpdateResponse, Error, number>({
    mutationFn: (visitId: number) => updateVisitStatus(visitId),
    onSuccess: () => {
      // 관련된 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.VISIT_DETAIL],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.CURRENT_VISIT],
      });
    },
  });
};

export default useUpdateVisitStatusMutation;
