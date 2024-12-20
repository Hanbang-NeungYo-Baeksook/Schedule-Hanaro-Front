import { postCallMemo } from '@/api/admin/calls';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';

export type CallMemoParams = {
  callId: number;
  body: {
    content: string;
  };
};

const usePostCallMemo = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: [ADMIN_QUERY_KEYS.CALL_MEMO],
    mutationFn: ({ callId, body }: CallMemoParams) =>
      postCallMemo({ callId, body }),
    onSuccess: () => {
      showToast(toast, '상담 내용이 등록되었습니다.');
    },
  });
};

export default usePostCallMemo;
