import { getInquiryDetail } from '@/api/admin/inquiry';
import { ADMIN_QUERY_KEYS } from '@/constants/queryKeys';
import { AdminInquiryDetail } from '@/types/inquiry';
import { useQuery } from '@tanstack/react-query';

const useGetInquiryDetail = (inquiryId: number) => {
  return useQuery<AdminInquiryDetail>({
    queryKey: [ADMIN_QUERY_KEYS.INQUIRY_DETAIL, inquiryId],
    queryFn: () => getInquiryDetail(inquiryId),
  });
};

export default useGetInquiryDetail;
