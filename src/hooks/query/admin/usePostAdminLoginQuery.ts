import { postAdminLogin } from '@/api/admin/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ADMIN_ROUTE } from '@/constants/route';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostAdminLoginQuery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: postAdminLogin,
    onSuccess: (data) => {
      console.log(data);
      window.localStorage.setItem('adminAccessToken', data.accessToken);
      showToast(toast, '로그인에 성공하였습니다!');
      navigate(ADMIN_ROUTE.online.main);
    },
  });
};

export default usePostAdminLoginQuery;
