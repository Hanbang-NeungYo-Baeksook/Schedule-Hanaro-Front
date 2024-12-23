import { REC_BRANCH_MOCK } from '@/mock/branch_mock';
import RecBranchBox from './RecBranchBox';
import { Badge } from '../ui/badge';
import { ReactComponent as PedestrainIcon } from '@/assets/icons/pedestrain.svg';
import { ReactComponent as PedestrainWhiteIcon } from '@/assets/icons/pedestrainWhite.svg';
import { ReactComponent as AutomobileIcon } from '@/assets/icons/automobile.svg';
import { ReactComponent as AutomobileWhiteIcon } from '@/assets/icons/automobileWhite.svg';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function RecBranch() {
  const [selectedPath, setSelectedPath] = useState<'pedestrain' | 'automobile'>(
    'pedestrain'
  );
  return (
    <div className='flex w-full flex-col items-start justify-center py-3 text-left'>
      <div className='flex w-full justify-between'>
        <span className='font-regular text-[1.125rem]'>실시간 추천 영업점</span>
        <div className='flex h-[90%] cursor-pointer items-center gap-1'>
          <Select>
            <SelectTrigger className='z-[61] space-x-1 border-none text-lightGrey'>
              <SelectValue placeholder='예금' />
            </SelectTrigger>
            <SelectContent className='right-8 z-[61]'>
              <SelectItem value='예금'>예금</SelectItem>
              <SelectItem value='개인대출'>개인대출</SelectItem>
              <SelectItem value='기업대출'>기업대출</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <span className='text-[0.75rem] text-[#666666]'>
        혼잡도를 기준으로 업무를 가장 빠르게 보실 수 있는 영업점을 추천해드려요!
      </span>
      <Badge
        variant='white'
        className='mt-1 h-[2.25rem] w-full px-0 py-0 text-[0.875rem] tracking-wider'
        onClick={() => {
          if (selectedPath === 'pedestrain') {
            setSelectedPath('automobile');
          } else {
            setSelectedPath('pedestrain');
          }
        }}
      >
        <div className='flex h-full w-full gap-2'>
          <Badge
            variant={selectedPath === 'pedestrain' ? 'dark' : 'white'}
            className='h-full w-full border-none py-1 text-[1.225rem] tracking-wider'
          >
            <div className='mx-auto flex items-center justify-center gap-1'>
              {selectedPath === 'pedestrain' ? (
                <PedestrainWhiteIcon />
              ) : (
                <PedestrainIcon />
              )}
              <span>도보</span>
            </div>
          </Badge>
          <Badge
            variant={selectedPath === 'pedestrain' ? 'white' : 'dark'}
            className='h-full w-full border-none py-1 text-[1.225rem] tracking-wider'
          >
            <div className='mx-auto flex w-full items-center justify-center gap-1'>
              {selectedPath === 'pedestrain' ? (
                <AutomobileIcon />
              ) : (
                <AutomobileWhiteIcon />
              )}
              <span className=''>차량</span>
            </div>
          </Badge>
        </div>
      </Badge>
      <ul className='flex w-full items-stretch gap-4 overflow-x-scroll p-2'>
        {REC_BRANCH_MOCK.map(({ branchId, branchName, location, distance }) => (
          <li key={branchId} className='w-[40%] flex-shrink-0 items-stretch'>
            <RecBranchBox
              branchId={branchId}
              branchName={branchName}
              location={location}
              distance={distance}
              waitingTime={23}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecBranch;
