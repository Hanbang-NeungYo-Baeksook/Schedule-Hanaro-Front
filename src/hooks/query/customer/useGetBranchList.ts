import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getBranchList, GetBranchListRequest } from '@/api/customer/branches';

const useGetBranchList = ({ latitude, longitude }: GetBranchListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH_LIST, latitude, longitude],
    queryFn: () => getBranchList({ latitude, longitude }),
  });
};

export default useGetBranchList;
