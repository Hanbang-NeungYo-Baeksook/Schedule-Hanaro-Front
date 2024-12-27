import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
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
    return (
      <div className='z-10 flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full bg-[#F2F2F2]' />
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
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
