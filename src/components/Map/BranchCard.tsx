import { ChevronRight, Clock4, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';

export type BranchCardProps = {
  id?: string;
  name: string;
  isOpen?: boolean;
  address: string;
  distance?: string;
  openTime?: string;
  waitingNumber: string;
  waitingTime: string;
  type?: 'branch' | 'atm' | 'reservedBranch';
};

function BranchCard({
  name,
  isOpen = true,
  address,
  distance,
  openTime,
  waitingNumber,
  waitingTime,
  type = 'branch',
}: BranchCardProps) {
  const [firstName, lastName] = name.split(' ');
  return (
    <div className='flex w-full cursor-pointer items-center justify-between rounded-[0.9375rem] bg-white p-6 shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] transition-colors duration-300 hover:bg-gray-50'>
      <div className='flex flex-col gap-1 text-left'>
        <div className='flex w-full items-center gap-3'>
          <div className='flex flex-wrap gap-2'>
            <span className='text-[1.5rem] font-bold'>{firstName}</span>
            <span className='text-[1.5rem] font-bold'>{lastName}</span>
          </div>
        </div>
        <span className='text-[0.875rem] text-lightGrey'>{address}</span>
        <div className='mb-1 flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <MapPin width='0.875rem' height='0.875rem' />
            <div>
              <span className='text-[0.875rem]'>{distance}m</span>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Clock4 width='0.875rem' height='0.875rem' />
            <div>
              <span className='text-[0.875rem]'>{openTime}</span>
            </div>
          </div>
          {isOpen ? (
            <Badge variant='lightSolid'>영업중</Badge>
          ) : (
            <Badge variant='lightSolid'>영업종료</Badge>
          )}
        </div>
        {type === 'branch' && (
          <div className='flex items-center gap-4'>
            <Badge variant='outline' className='gap-2 rounded-[5px]'>
              <span>대기인원</span>
              <span>{waitingNumber}명</span>
            </Badge>
            <Badge className='gap-2 rounded-[5px] bg-[rgba(0,0,0,0.07)] px-4 py-2 text-[0.875rem] text-lightGrey'>
              <span>예상대기시간</span>
              <span>{waitingTime}분</span>
            </Badge>
          </div>
        )}
      </div>
      <div>
        <ChevronRight width='1.1875rem' height='1.1875rem' />
      </div>
    </div>
  );
}

export default BranchCard;
