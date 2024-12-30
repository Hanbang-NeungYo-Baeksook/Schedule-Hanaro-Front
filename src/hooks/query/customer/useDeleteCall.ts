import { deleteCall } from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CUSTOMER_ROUTE } from '@/constants/route';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteCall = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.CALL_DEL],
    mutationFn: deleteCall,
    onSuccess: ({ call_id }) => {
      console.debug(call_id);
      showToast(toast, '취소되었습니다.');
      setTimeout(() => {
        navigate(CUSTOMER_ROUTE.reservation.call);
      }, 200);
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default useDeleteCall;
