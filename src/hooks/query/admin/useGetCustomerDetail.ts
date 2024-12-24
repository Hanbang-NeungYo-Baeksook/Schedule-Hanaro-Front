import { getCustomerDetail } from '@/api/admin/customer';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminCustomerDetail } from '@/types/customer';
import { useQuery } from '@tanstack/react-query';

const useGetCustomerDetail = (customerId: number) => {
  return useQuery<AdminCustomerDetail>({
    queryKey: [ADMIN_QUERY_KEYS.CUSTOMER_DETAIL, customerId],
    queryFn: () => getCustomerDetail(customerId),
    enabled: customerId !== 0,
  });
};

export default useGetCustomerDetail;
