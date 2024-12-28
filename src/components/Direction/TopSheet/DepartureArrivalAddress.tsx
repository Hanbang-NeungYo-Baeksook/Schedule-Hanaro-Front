import LoadingBasic from '@/components/Loading';
import { Separator } from '@/components/ui/separator';
import { useMap } from '@/hooks/map-context';
import useGetBranchDetail from '@/hooks/query/customer/useGetBranchDetail';

export default function DepartureArrivalAddress({
  branchId,
}: {
  branchId: string;
}) {
  const { startAddress, getCurrentLatitude, getCurrentLongitude } = useMap();

  const { data: branch, isLoading } = useGetBranchDetail({
    branch_id: +branchId,
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
  });

  if (isLoading || !branch) {
    return <LoadingBasic />;
  }

  return (
    <div className='flex w-fit flex-col justify-between gap-1 text-left'>
      <div className='flex flex-col'>
        <div className='text-xs text-gray-400'>출발지</div>
        <div className='font-bold'>{startAddress || ''}</div>
      </div>

      <Separator />
      <div className='flex flex-col'>
        <div className='text-xs text-gray-400'>도착지</div>
        <div className='font-bold'>{branch?.address}</div>
      </div>
    </div>
  );
}
