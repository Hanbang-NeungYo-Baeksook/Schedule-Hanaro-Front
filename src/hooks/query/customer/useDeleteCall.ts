import { deleteCall } from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
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
      console.log(call_id);
      showToast(toast, '취소되었습니다.');
      setTimeout(() => {
        navigate('/reservation/call');
      }, 200);
    },
    onError: ({ code, error }: { code: string; error: string }) => {
      console.log(code);
      console.log(error);
    },
  });
};

export default useDeleteCall;
