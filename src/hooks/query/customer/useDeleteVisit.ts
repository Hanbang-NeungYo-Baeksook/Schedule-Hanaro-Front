import { deleteVisit } from '@/api/customer/visits';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteVisit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.VISIT_DEL],
    mutationFn: deleteVisit,
    onSuccess: ({ visit_id }) => {
      console.log(visit_id);
      showToast(toast, '취소되었습니다.');
      setTimeout(() => {
        navigate('/reservation/visit');
      }, 200);
    },
    onError: ({ code, error }: { code: string; error: string }) => {
      console.log(code);
      console.log(error);
    },
  });
};

export default useDeleteVisit;
