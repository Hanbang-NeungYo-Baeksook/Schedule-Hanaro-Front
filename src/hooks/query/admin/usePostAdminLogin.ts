import { postAdminLogin } from '@/api/admin/auth';
import { AccessTokenNames } from '@/api/Api';
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
    onSuccess: ({
      accessToken,
      adminInfo: { adminId, adminName, branchName },
    }) => {
      const tokenName: AccessTokenNames = 'adminAccessToken';
      window.localStorage.setItem(tokenName, accessToken);

      const adminInfo = {
        storeName: branchName,
        name: adminName,
        position: '사원',
        id: adminId.toString(),
      };

      window.localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

      showToast(toast, '로그인에 성공하였습니다!');
      navigate(ADMIN_ROUTE.online.main);
      window.location.reload();
    },
  });
};

export default usePostAdminLogin;
