import { ReactComponent as Refresh } from '@/assets/icons/refresh.svg';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CloseButton } from '../ui/close';

function ReservationDetailHeader({
  reservationType,
}: {
  reservationType: 'visit' | 'call' | 'inquiry';
}) {
  const [now, setNow] = useState(Date.now());
  const [isSpinning, setIsSpinning] = useState(true);
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    setIsSpinning(true);
    queryClient.invalidateQueries({
      queryKey: [`${reservationType}-detail`],
    });
    setNow(Date.now());

    setTimeout(() => setIsSpinning(false), 500);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleRefresh, []);

  return (
    <div className='customWidth fixed top-0 mx-auto box-border bg-white'>
      <div className='mx-auto flex w-[90%] items-center justify-between pb-4 pt-6'>
        <div
          className='flex cursor-pointer items-center gap-2 self-end'
          onClick={handleRefresh}
        >
          <div
            className={cn(
              `transition-transform duration-500 ease-in-out`,
              isSpinning ? 'animate-spin-once' : ''
            )}
          >
            <Refresh />
          </div>
          <span className='text-[1.25rem] font-normal text-[#666]'>
            {dayjs(now).format('HH:mm')}
          </span>
        </div>

        <CloseButton location={`reservation/${reservationType}`} />
      </div>
    </div>
  );
}

export default ReservationDetailHeader;
