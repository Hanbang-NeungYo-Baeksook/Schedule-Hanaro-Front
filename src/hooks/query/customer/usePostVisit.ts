import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { postVisit } from '@/api/customer/visits';

const usePostVisit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.VISIT_ADD],
    mutationFn: postVisit,
    onSuccess: ({ visit_id }) => {
      console.log(visit_id);
      showToast(toast, '예약 완료되었습니다!');
      setTimeout(() => {
        navigate(`/reservation/visit/${visit_id}`);
      }, 300);
    },
  });
};

export default usePostVisit;
