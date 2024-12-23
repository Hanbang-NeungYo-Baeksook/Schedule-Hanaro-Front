import { deleteInquiry } from '@/api/customer/inquires';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteInquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.INQUIRY_DEL],
    mutationFn: deleteInquiry,
    onSuccess: ({ inquiry_id }) => {
      console.log(inquiry_id);
      showToast(toast, '취소되었습니다.');
      setTimeout(() => {
        navigate('/reservation/Inquiry');
      }, 200);
    },
    onError: (message: string) => {
      console.log('Error');
      console.log(message);
    },
  });
};

export default useDeleteInquiry;