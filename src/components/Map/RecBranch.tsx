import { SectionType, TransportType } from '@/api/customer/branches';
import { ReactComponent as AutomobileIcon } from '@/assets/icons/automobile.svg';
import { ReactComponent as AutomobileWhiteIcon } from '@/assets/icons/automobileWhite.svg';
import { ReactComponent as PedestrainIcon } from '@/assets/icons/pedestrain.svg';
import { ReactComponent as PedestrainWhiteIcon } from '@/assets/icons/pedestrainWhite.svg';
import { useMap } from '@/hooks/map-context';
import useGetBranchRecommendList from '@/hooks/query/customer/useGetBranchRecommendList';
import { useRef, useState } from 'react';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import RecBranchBox from './RecBranchBox';

function RecBranch() {
  const [transportType, setTransportType] = useState<TransportType>('WALK');
  const sectionType = useRef<SectionType>('DEPOSIT');
  const { getCurrentLatitude, getCurrentLongitude } = useMap();

  const setSectionType = (type: SectionType) => {
    sectionType.current = type;
  };

  const { data: branchRecommendList, isLoading } = useGetBranchRecommendList({
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
    transportType: transportType,
    sectionType: sectionType.current,
  });

  const convertValueToItem = (type: SectionType) => {
    if (type === 'DEPOSIT') {
      return '예금';
    } else if (type === 'PERSONAL_LOAN') {
      return '개인대출';
    } else {
      return '기업대출';
    }
  };

  return (
    <div className='flex w-full flex-col items-start justify-center py-3 text-left'>
      <div className='flex w-full justify-between'>
        <span className='text-[1.25rem] font-bold'>실시간 추천 영업점</span>
        <div className='flex h-[90%] cursor-pointer items-center gap-1'>
          <Select
            onValueChange={(value: string) =>
              setSectionType(value as SectionType)
            }
          >
            <SelectTrigger className='z-[61] space-x-1 border-none text-lightGrey'>
              <SelectValue
                placeholder={convertValueToItem(sectionType.current)}
              />
            </SelectTrigger>
            <SelectContent className='right-8 z-[61]'>
              <SelectItem value='DEPOSIT'>예금</SelectItem>
              <SelectItem value='PERSONAL_LOAN'>개인대출</SelectItem>
              <SelectItem value='OTHERS'>기업대출</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <span className='text-[0.875rem] text-[#666666]'>
        혼잡도를 기준으로 업무를 가장 빠르게 보실 수 있는 영업점을 추천해드려요!
      </span>
      <Badge
        variant='white'
        className='mt-1 h-[2.25rem] w-full px-0 py-0 text-[0.875rem] tracking-wider'
        onClick={() => {
          if (transportType === 'WALK') {
            setTransportType('CAR');
          } else {
            setTransportType('WALK');
          }
        }}
      >
        <div className='flex h-full w-full gap-2'>
          <Badge
            variant={transportType === 'WALK' ? 'dark' : 'white'}
            className='h-full w-full border-none py-1 text-[1.225rem] tracking-wider'
          >
            <div className='mx-auto flex items-center justify-center gap-1'>
              {transportType === 'WALK' ? (
                <PedestrainWhiteIcon />
              ) : (
                <PedestrainIcon />
              )}
              <span>도보</span>
            </div>
          </Badge>
          <Badge
            variant={transportType === 'WALK' ? 'white' : 'dark'}
            className='h-full w-full border-none py-1 text-[1.225rem] tracking-wider'
          >
            <div className='mx-auto flex w-full items-center justify-center gap-1'>
              {transportType === 'WALK' ? (
                <AutomobileIcon />
              ) : (
                <AutomobileWhiteIcon />
              )}
              <span className=''>차량</span>
            </div>
          </Badge>
        </div>
      </Badge>
      <ul className='custom-scrollbar flex h-full w-full items-stretch gap-4 overflow-x-scroll p-2'>
        {isLoading || !branchRecommendList ? (
          Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className='h-28 w-[40%] flex-shrink-0 animate-pulse items-stretch space-y-2 rounded-[15px] bg-white pt-3 shadow-[0px_0px_10px_5px_rgba(0,0,0,0.05)]'
            >
              <Skeleton className='mx-auto h-[20%] w-[80%] animate-pulse rounded-full bg-[#F2F2F2]' />
              <Skeleton className='mx-auto h-[20%] w-[80%] animate-pulse rounded-full bg-[#F2F2F2]' />
            </li>
          ))
        ) : branchRecommendList.recommend_list.length === 0 ? (
          <span className='mx-auto'>주변에 추천할 영업점이 없습니다.</span>
        ) : (
          branchRecommendList.recommend_list?.map(
            ({
              branch_id: branchId,
              branch_name: branchName,
              address,
              distance,
              wait_time,
            }) => (
              <li
                key={branchId}
                className='w-[40%] flex-shrink-0 items-stretch'
              >
                <RecBranchBox
                  branchId={branchId}
                  branchName={branchName}
                  location={address}
                  distance={distance}
                  waitingTime={wait_time}
                />
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default RecBranch;
