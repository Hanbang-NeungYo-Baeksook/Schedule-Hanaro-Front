import { ChevronRight, Clock4, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

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

type WaitingInfo = {
  section: '예금' | '개인대출' | '기업대출';
  waitingAmount: number;
  waitingTime: number;
};

function BranchCard({
  name,
  isOpen = true,
  address,
  distance,
  openTime,
  type = 'branch',
}: BranchCardProps) {
  const [firstName, lastName] = name.split(' ');

  const waitingInfos: WaitingInfo[] = [
    {
      section: '예금',
      waitingAmount: 10,
      waitingTime: 25,
    },
    {
      section: '개인대출',
      waitingAmount: 3,
      waitingTime: 12,
    },
    {
      section: '기업대출',
      waitingAmount: 0,
      waitingTime: 0,
    },
  ];
  return (
    <div className='flex w-full cursor-pointer items-center rounded-[0.9375rem] bg-white p-6 shadow-[0_0_10px_5px_rgba(0,0,0,0.05)] transition-colors duration-300 hover:bg-gray-50'>
      <div className='flex w-full flex-col gap-1 text-left'>
        <div className='flex w-full items-center justify-between gap-3'>
          <div className='flex flex-wrap gap-2'>
            <span className='text-[1.5rem] font-bold'>{firstName}</span>
            <span className='text-[1.5rem] font-bold'>{lastName}</span>
          </div>
          <div>
            <ChevronRight width='1.1875rem' height='1.1875rem' />
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
            <Badge variant='noactive'>영업종료</Badge>
          )}
        </div>
        {type === 'branch' && (
          <>
            <Separator className='my-2' />
            <div className='flex items-center gap-4'>
              {waitingInfos.map((waitingInfo, index) => (
                <Badge
                  variant='outline'
                  className='w-full gap-2 rounded-[8px] bg-[#]'
                  key={index}
                >
                  <div className='flex w-full flex-col gap-1 py-2'>
                    <span className='text-[0.85rem]'>
                      {waitingInfo.section}
                    </span>
                    <div className='flex w-full justify-between'>
                      <span>대기인원</span>
                      <div className='flex gap-[0.05rem]'>
                        <span>{waitingInfo.waitingAmount}</span>
                        <span>명</span>
                      </div>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span>대기시간</span>
                      <div className='flex gap-[0.05rem]'>
                        <span>{waitingInfo.waitingTime}</span>
                        <span>분</span>
                      </div>
                    </div>
                  </div>
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BranchCard;
