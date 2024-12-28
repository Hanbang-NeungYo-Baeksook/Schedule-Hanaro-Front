import { postSignUp } from '@/api/customer/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { CUSTOMER_ROUTE } from '@/constants/route';

const usePostSignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.SIGN_UP],
    mutationFn: postSignUp,
    onSuccess: ({ message }) => {
      console.log(message);
      showToast(toast, '회원가입에 성공하였습니다!');
      navigate(CUSTOMER_ROUTE.signin);
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default usePostSignUp;
