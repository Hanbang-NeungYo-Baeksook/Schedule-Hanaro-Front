import { getInquiryList, GetInquiryListRequest } from '@/api/customer/inquires';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetInquiryList = ({
  status = 'PENDING',
  page = 0,
  size = 0,
}: GetInquiryListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INQUIRY_LIST, status, page, size],
    queryFn: () => getInquiryList({ status, page, size }),
  });
};

export default useGetInquiryList;
