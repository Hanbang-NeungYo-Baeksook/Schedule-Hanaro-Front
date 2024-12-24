import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { postInquiry } from '@/api/customer/inquires';

const usePostInquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.INQUIRY_ADD],
    mutationFn: postInquiry,
    onSuccess: ({ inquiry_id }) => {
      console.log(inquiry_id);
      showToast(toast, '예약 완료되었습니다!');
      setTimeout(() => {
        navigate(`/reservation/inquiry/${inquiry_id}`);
      }, 300);
    },
  });
};

export default usePostInquiry;
