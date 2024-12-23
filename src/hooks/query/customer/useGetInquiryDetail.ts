import {
  getInquiryDetail,
  GetInquiryDetailRequest,
} from '@/api/customer/inquires';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetInquiryDetail = (
  getInquiryDetailRequest: GetInquiryDetailRequest
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INQUIRY_DETAIL, getInquiryDetailRequest],
    queryFn: () => getInquiryDetail(getInquiryDetailRequest),
  });
};

export default useGetInquiryDetail;
