import { postLogin } from '@/api/customer/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';
import { TokenNames } from '@/api/Api';

const usePostLoginQuery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ accessToken }) => {
      console.log(accessToken);
      const tokenName: TokenNames = 'customerAccessToken';
      window.localStorage.setItem(tokenName, accessToken);
      showToast(toast, '로그인에 성공하였습니다!');
      navigate('/');
    },
  });
};

export default usePostLoginQuery;
