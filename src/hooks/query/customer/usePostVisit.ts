import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { postVisit } from '@/api/customer/visits';
import { useSetAtom } from 'jotai';
import { contentAtom } from '@/stores';

const usePostVisit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const setContent = useSetAtom(contentAtom);

  return useMutation({
    mutationKey: [QUERY_KEYS.VISIT_ADD],
    mutationFn: postVisit,
    onSuccess: ({ visit_id }) => {
      showToast(toast, '예약 완료되었습니다!');
      setContent('');
      setTimeout(() => {
        navigate(`/reservation/visit/${visit_id}`);
      }, 300);
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default usePostVisit;
