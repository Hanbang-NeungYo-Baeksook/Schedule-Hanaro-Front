import { postLogin } from '@/api/auth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { showToast } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../use-toast';

const usePostLoginQuery = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ accessToken }) => {
      console.log(accessToken);
      window.localStorage.setItem('accessToken', accessToken);
      showToast(toast, '로그인에 성공하였습니다!');
      navigate('/');
    },
  });
};

export default usePostLoginQuery;
