import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CallDataType } from '@/types/inquiry';

type Props = {
  isSelected: boolean;
} & Omit<CallDataType, 'now'>;

function WaitingBox({
  isSelected,
  waitingNum,
  category,
  content,
  userName,
  resTime,
}: Props) {
  return (
    <div
      className={cn(
        'flex h-[60px] cursor-pointer flex-col border-b-[1px] border-[#D9D9D9] px-5 py-2',
        isSelected ? 'bg-[#EFEFEF]' : 'bg-white'
      )}
    >
      <div className='flex items-center justify-between'>
        <div className='space-x-3'>
          <span className='text-[1.125rem]'>{waitingNum}</span>
          <Badge>{category}</Badge>
        </div>
        <span className='text-[0.75rem]'>{userName}</span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-[0.875rem]'>{content}</span>
        <span className='text-[0.625rem]'>{resTime}</span>
      </div>
    </div>
  );
}

export default WaitingBox;
