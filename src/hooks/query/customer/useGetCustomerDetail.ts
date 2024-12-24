import { getCustomerDetail } from '@/api/customer/customers';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCustomerDetail = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOMER_DETAIL],
    queryFn: () => getCustomerDetail(),
  });
};

export default useGetCustomerDetail;
