import { getCustomerHistory } from '@/api/admin/customer';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminCustomerHistory } from '@/types/customer';
import { useQuery } from '@tanstack/react-query';

const useGetCustomerHistory = (customerId: number) => {
  return useQuery<AdminCustomerHistory>({
    queryKey: [ADMIN_QUERY_KEYS.CUSTOMER_HISTORY, customerId],
    queryFn: () => getCustomerHistory(customerId),
    enabled: customerId !== 0,
  });
};

export default useGetCustomerHistory;
