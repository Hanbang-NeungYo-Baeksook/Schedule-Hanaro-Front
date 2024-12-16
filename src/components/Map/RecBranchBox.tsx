import { RecBranch } from '@/types/branch';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';

function RecBranchBox({
  branchId,
  branchName,
  location,
  distance,
  congestion,
}: RecBranch) {
  const navigate = useNavigate();

  const handlePage = (path: string) => () => {
    navigate(path);
  };
  return (
    <div
      onClick={handlePage(`/branch/${branchId}`)}
      className='flex h-full w-full flex-col items-start justify-between rounded-[15px] px-4 py-4 shadow-[0px_0px_10px_8px_rgba(0,0,0,0.05)]'
    >
      <span className='text-[1.25rem] font-bold'>{branchName}</span>
      <span className='text-[0.75rem] text-lightGrey'>{location}</span>
      <span className='text-[0.875rem]'>{distance} m</span>
      <Badge
        variant='lightSolid'
        className='flex w-full items-center justify-center gap-3'
      >
        <span>혼잡도</span>
        <span>{congestion} %</span>
      </Badge>
    </div>
  );
}

export default RecBranchBox;
