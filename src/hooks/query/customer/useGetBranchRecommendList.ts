import {
  getBranchRecommendList,
  GetBranchRecommendListRequest,
} from '@/api/customer/branches';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetBranchRecommendList = (
  getBranchRecommendListRequest: GetBranchRecommendListRequest
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH_RECOMMEND, getBranchRecommendListRequest],
    queryFn: () => getBranchRecommendList(getBranchRecommendListRequest),
  });
};

export default useGetBranchRecommendList;
