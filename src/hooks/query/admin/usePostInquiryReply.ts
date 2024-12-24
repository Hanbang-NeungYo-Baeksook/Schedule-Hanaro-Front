import { postInquiryReply } from '@/api/admin/inquiry';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { ADMIN_ROUTE } from '@/constants/route';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
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

  return useMutation({
    mutationKey: [ADMIN_QUERY_KEYS.INQUIRY_REPLY],
    mutationFn: ({ inquiryId, body }: InquiryReplyParams) =>
      postInquiryReply({ inquiryId, body }),
    onSuccess: () => {
      showToast(toast, '상담 답변이 등록되었습니다.');
      navigate(ADMIN_ROUTE.online.inquiry);
    },
  });
};

export default usePostInquiryReply;
