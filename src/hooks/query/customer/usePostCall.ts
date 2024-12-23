import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { postCall } from '@/api/customer/calls';

const usePostCall = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.CALL_ADD],
    mutationFn: postCall,
    onSuccess: ({ call_id }) => {
      console.log(call_id);
      showToast(toast, '예약 완료되었습니다!');
      setTimeout(() => {
        navigate(`/reservation/call/${call_id}`);
      }, 300);
    },
  });
};

export default usePostCall;
