import { Separator } from '@/components/ui/separator';
import { useMap } from '@/hooks/map-context';
import { BRANCH_MOCK } from '@/mock/branch_mock';

export default function DepartureArrivalAddress({
  branchId,
}: {
  branchId: string;
}) {
  const { startAddress } = useMap();

  const branchIdx = BRANCH_MOCK.findIndex(({ id }) => id === branchId);

  return (
    <div className='flex w-fit flex-col justify-between gap-1 text-left'>
      <div className='flex flex-col'>
        <div className='text-xs text-gray-400'>출발지</div>
        <div className='font-bold'>{startAddress || ''}</div>
      </div>

      <Separator />
      <div className='flex flex-col'>
        <div className='text-xs text-gray-400'>도착지</div>
        <div className='font-bold'>
          {branchIdx === -1 ? '' : BRANCH_MOCK[branchIdx].name}
        </div>
      </div>
    </div>
  );
}
