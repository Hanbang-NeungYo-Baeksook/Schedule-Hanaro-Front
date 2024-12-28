import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { postInquiry } from '@/api/customer/inquires';
import { useSetAtom } from 'jotai';
import { contentAtom } from '@/stores';

const usePostInquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const setContent = useSetAtom(contentAtom);

  return useMutation({
    mutationKey: [QUERY_KEYS.INQUIRY_ADD],
    mutationFn: postInquiry,
    onSuccess: ({ inquiry_id }) => {
      console.log(inquiry_id);
      showToast(toast, '예약 완료되었습니다!');
      setContent('');
      setTimeout(() => {
        navigate(`/reservation/inquiry/${inquiry_id}`);
      }, 300);
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default usePostInquiry;
