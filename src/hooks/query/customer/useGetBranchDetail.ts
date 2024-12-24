import {
  getBranchDetail,
  GetBranchDetailRequest,
} from '@/api/customer/branches';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetBranchDetail = (getBranchDetailRequest: GetBranchDetailRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH_DETAIL, getBranchDetailRequest],
    queryFn: () => getBranchDetail(getBranchDetailRequest),
  });
};

export default useGetBranchDetail;
