import { getInquiryList, InquirySearchConditions } from '@/api/admin/inquiry';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminInquiry } from '@/types/inquiry';
import { useQuery } from '@tanstack/react-query';

const useGetInquiryList = (searchConditions: InquirySearchConditions) => {
  const { page, status, category, search_content } = searchConditions;

  return useQuery<AdminInquiry>({
    queryKey: [
      ADMIN_QUERY_KEYS.CALL_LIST,
      { page, status, category, search_content },
    ],
    queryFn: () => getInquiryList({ page, status, category, search_content }),
  });
};

export default useGetInquiryList;