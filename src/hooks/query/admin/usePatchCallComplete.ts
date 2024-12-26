import { patchCallComplete } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchCallComplete = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_QUERY_KEYS.CALL_COMPLETE],
    mutationFn: (callId: number) => patchCallComplete({ callId }),
    onSuccess: () => {
      showToast(toast, `상담이 완료되었습니다.`);
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
      });
    },
  });
};

export default usePatchCallComplete;
