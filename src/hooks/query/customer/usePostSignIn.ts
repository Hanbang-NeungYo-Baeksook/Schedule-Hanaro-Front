import { postSignIn } from '@/api/customer/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { AccessTokenNames } from '@/api/Api';

const usePostSignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.SIGN_IN],
    mutationFn: postSignIn,
    onSuccess: ({ accessToken }) => {
      const accessTokenName: AccessTokenNames = 'customerAccessToken';
      window.localStorage.setItem(accessTokenName, accessToken);
      showToast(toast, '로그인에 성공하였습니다!');
      navigate('/');
      window.location.reload();
    },
    onError(error) {
      showToast(toast, error.message);
    },
  });
};

export default usePostSignIn;
