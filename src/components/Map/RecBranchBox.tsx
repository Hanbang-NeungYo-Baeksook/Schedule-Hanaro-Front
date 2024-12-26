import { RecBranch } from '@/types/branch';
import { useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';

function RecBranchBox({
  branchId,
  branchName,
  location,
  distance,
  waitingTime,
}: RecBranch) {
  const navigate = useNavigate();

  const handlePage = (path: string) => () => {
    navigate(path);
  };
  return (
    <div
      onClick={handlePage(`/branch/${branchId}`)}
      className='flex h-full w-full flex-col items-start justify-between rounded-[15px] px-4 py-4 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.05)]'
    >
      <span className='text-[1.25rem] font-bold'>{branchName}</span>
      <span className='text-[0.75rem] text-lightGrey'>{location}</span>

      <Separator />
      <div className='flex w-full justify-between'>
        <span className='text-[0.875rem]'>거리</span>
        <span className='text-[0.875rem] text-[#339D9D]'>{distance}m</span>
      </div>
      <div className='flex w-full justify-between'>
        <span className='text-[0.875rem]'>예상 대시 시간</span>
        <span className='text-[0.875rem] text-[#339D9D]'>{waitingTime}분</span>
      </div>
    </div>
  );
}

export default RecBranchBox;
