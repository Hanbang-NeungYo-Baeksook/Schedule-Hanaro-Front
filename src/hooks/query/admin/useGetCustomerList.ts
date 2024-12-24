import { getCustomerList } from '@/api/admin/customer';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminCustomer } from '@/types/customer';
import { useQuery } from '@tanstack/react-query';

const useGetCustomerList = (page: number) => {
  return useQuery<AdminCustomer>({
    queryKey: [ADMIN_QUERY_KEYS.CUSTOMER_LIST, { page }],
    queryFn: () => getCustomerList(page),
  });
};

export default useGetCustomerList;
