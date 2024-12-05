import { ReactComponent as Close } from '@/assets/icons/close.svg';
import { cn } from '@/lib/utils';
import BranchInfo from './BranchInfo';
import ReservationButton from './ReservationButton';
import { useMap } from '@/hooks/map-context';

export type FloatingType = {
  type: 'dir' | 'map';
};

export default function BottomFloatingBox({
  type,
  branchId,
}: FloatingType & { branchId: string }) {
  const { setSelectedBranchId } = useMap();

  const initBranchId = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedBranchId(null);
  };

  return (
    <div
      className={cn(
        'fixed bottom-[7rem] z-10 h-fit w-[70%] max-w-[30rem] cursor-pointer rounded-xl bg-white p-8 pt-5 max-[550px]:w-[75%] max-[511px]:w-[80%] max-[480px]:w-[85%] max-[450px]:w-[90%] max-[400px]:w-[95%] max-[380px]:w-[97%]',
        type === 'map' && 'bottom-[4rem] pt-3'
      )}
    >
      <div className='flex h-full w-full flex-col justify-between'>
        {type === 'map' && (
          <span className='mb-2 flex justify-end'>
            <Close
              width={18}
              height={18}
              className='cursor-pointer'
              onClick={initBranchId}
            />
          </span>
        )}

        <BranchInfo type={type} branchId={branchId} />
        <ReservationButton />
      </div>
    </div>
  );
}
