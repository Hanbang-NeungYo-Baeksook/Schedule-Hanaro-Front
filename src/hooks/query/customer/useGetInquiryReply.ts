import {
  getInquiryReply,
  GetInquiryReplyRequest,
} from '@/api/customer/inquires';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetInquiryReply = (getInquiryReplyRequest: GetInquiryReplyRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INQUIRY_REPLY, getInquiryReplyRequest],
    queryFn: () => getInquiryReply(getInquiryReplyRequest),
  });
};

export default useGetInquiryReply;
