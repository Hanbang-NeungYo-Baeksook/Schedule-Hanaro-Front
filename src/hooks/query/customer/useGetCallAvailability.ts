import {
  getCallAvailability,
  GetCallAvailabilityRequest,
} from '@/api/customer/calls';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetCallAvailability = (
  getCallAvailabilityRequest: GetCallAvailabilityRequest
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALL_AVL, getCallAvailabilityRequest],
    queryFn: () => getCallAvailability(getCallAvailabilityRequest),
    enabled: !!getCallAvailabilityRequest.date,
  });
};

export default useGetCallAvailability;
