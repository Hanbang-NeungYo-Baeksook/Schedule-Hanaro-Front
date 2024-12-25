import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getBranchList, GetBranchListRequest } from '@/api/customer/branches';

const useGetBranchList = (getBranchListRequest: GetBranchListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH_LIST, getBranchListRequest],
    queryFn: () => getBranchList(getBranchListRequest),
  });
};

export default useGetBranchList;
