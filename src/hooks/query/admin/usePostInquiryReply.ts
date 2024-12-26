import { postInquiryReply } from '@/api/admin/inquiry';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { ADMIN_ROUTE } from '@/constants/route';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type InquiryReplyParams = {
  inquiryId: number;
  body: {
    content: string;
  };
};

const usePostInquiryReply = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_QUERY_KEYS.INQUIRY_REPLY],
    mutationFn: ({ inquiryId, body }: InquiryReplyParams) =>
      postInquiryReply({ inquiryId, body }),
    onSuccess: () => {
      showToast(toast, '답변이 등록되었습니다.');
      navigate(ADMIN_ROUTE.online.inquiry);
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.INQUIRY_LIST],
      });
    },
  });
};

export default usePostInquiryReply;
