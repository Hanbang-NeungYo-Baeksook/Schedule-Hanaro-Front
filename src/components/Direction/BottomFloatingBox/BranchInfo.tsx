import { ReactComponent as Hyperlink } from '@/assets/icons/hyperlink.svg';
import { DirectionButton } from '@/components/ui/direction';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { BRANCH_MOCK, BRANCH_STATE_MOCK } from '@/mock/branch_mock';
import { showToast } from '@/pages';
import { useNavigate } from 'react-router-dom';
import { FloatingType } from '.';
import { useMap } from '@/hooks/map-context';
import { useState } from 'react';
import { ChangeToggle } from './ChangeToggle';

export default function BranchInfo({
  type,
  branchId,
}: FloatingType & { branchId: string }) {
  const { getCurrentLatitude, getCurrentLongitude } = useMap();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'pedestrain' | 'automobile'>(
    'pedestrain'
  );
  const navigate = useNavigate();
  const targetBranch = BRANCH_MOCK.find(({ id }) => id === branchId);
  const targetBranchState = BRANCH_STATE_MOCK.find(({ id }) => id === branchId);

  const handleDirection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (targetBranch) {
      const { position_x: longitude, position_y: latitude } = targetBranch;
      // TODO: startLat, startLon 현 위치로 수정
      navigate(
        `/direction?startLat=${getCurrentLatitude()}&startLon=${getCurrentLongitude()}&endLat=${latitude}&endLon=${longitude}&branchId=${branchId}`
      );
      showToast(toast, '길 안내를 시작합니다.');
    }
  };

  const handlePage = (url: string) => () => {
    navigate(url);
  };

  const selectTab = (tabName: 'pedestrain' | 'automobile') => {
    setSelectedTab(tabName);
    setIsOpen(false);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start justify-center gap-1'>
          <div
            className='flex items-center justify-center gap-2'
            onClick={handlePage(`/branch/${branchId}`)}
          >
            <span className='flex text-2xl font-extrabold max-[375px]:text-sm'>
              {targetBranch?.name ?? ''}
            </span>
            <Hyperlink />
          </div>
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <span className='text-[1rem] text-lightGrey max-[375px]:text-[0.5rem]'>
              {targetBranch?.address ?? ''}
            </span>
            <div className='flex items-center'>
              <Separator orientation='vertical' className='h-[0.6875rem]' />
            </div>
            <span className='text-[1.125rem] font-bold max-[375px]:text-[0.7rem]'>
              202m
            </span>
          </div>
        </div>
        {type === 'map' ? (
          <DirectionButton variant='square' onClick={handleDirection} />
        ) : (
          <span className='mb-2 flex justify-end'>
            <ChangeToggle
              isOpen={isOpen}
              onToggle={() => {
                setIsOpen((cur) => !cur);
              }}
              selectedTab={selectedTab}
              onSelect={selectTab}
            />
          </span>
        )}
      </div>
      <div className='my-3 flex gap-5'>
        <div className='flex items-end gap-3'>
          <span className='text-sm max-[375px]:text-xs'>대기인원</span>
          <span className='text-md font-bold max-[375px]:text-sm'>{`${targetBranchState?.waiting_number ?? 0}명`}</span>
        </div>
        <div className='flex items-center'>
          <Separator orientation='vertical' className='h-[0.6875rem]' />
        </div>
        <div className='flex items-end gap-3'>
          <span className='text-sm max-[375px]:text-xs'>예상대기시간</span>
          <span className='text-md font-bold max-[375px]:text-sm'>{`${targetBranchState?.waiting_time ?? 0}분`}</span>
        </div>
      </div>
      <Toaster />
    </>
  );
}
