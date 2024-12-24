import { postAdminLogin } from '@/api/admin/auth';
import { TokenNames } from '@/api/Api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ADMIN_ROUTE } from '@/constants/route';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostAdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.SIGN_IN],
    mutationFn: postAdminLogin,
    onSuccess: ({ accessToken }) => {
      const tokenName: TokenNames = 'adminAccessToken';
      window.localStorage.setItem(tokenName, accessToken);
      showToast(toast, '로그인에 성공하였습니다!');
      navigate(ADMIN_ROUTE.online.main);
    },
  });
};

export default usePostAdminLogin;
