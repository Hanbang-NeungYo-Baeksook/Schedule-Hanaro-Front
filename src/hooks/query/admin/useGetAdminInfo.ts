import { getAdminInfo } from '@/api/admin/mypage';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminInfo } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';

const useGetAdminInfo = () => {
  return useQuery<AdminInfo>({
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_INFO],
    queryFn: () => getAdminInfo(),
  });
};

export default useGetAdminInfo;
