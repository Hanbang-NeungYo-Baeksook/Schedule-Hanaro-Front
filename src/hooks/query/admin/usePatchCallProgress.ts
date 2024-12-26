import { patchCallProgress } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchCallProgress = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_QUERY_KEYS.CALL_PROGRESS],
    mutationFn: patchCallProgress,
    onSuccess: (response) => {
      console.log(response);
      showToast(toast, `${response}번 상담이 시작되었습니다.`);
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.CALL_WAIT_LIST],
      });
    },
  });
};

export default usePatchCallProgress;
