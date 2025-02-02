import { ReactComponent as Hyperlink } from '@/assets/icons/hyperlink.svg';
import LoadingBasic from '@/components/Loading';
import { WaitingInfo } from '@/components/Map/BranchCard';
import { Badge } from '@/components/ui/badge';
import { DirectionButton } from '@/components/ui/direction';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { useMap } from '@/hooks/map-context';
import useGetBranchDetail from '@/hooks/query/customer/useGetBranchDetail';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/pages';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingType } from '.';
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
  const { data: targetBranch, isLoading } = useGetBranchDetail({
    branch_id: +branchId,
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
  });

  if (isLoading || !targetBranch) {
    return <LoadingBasic />;
  }

  const {
    x_position: longitude,
    y_position: latitude,
    branch_name: name,
    address,
    distance,
    section_types: sectionType,
    wait_amount: waitingNumber,
    wait_time: waitingTime,
    branch_type: branchType,
  } = targetBranch;

  const [topName, bottomName] = name.split(' ');

  const waitingInfos: WaitingInfo[] = [];
  if (branchType === '방문점' && sectionType) {
    for (let i = 0; i < sectionType?.length; i++) {
      waitingInfos.push({
        section: sectionType?.at(i) ?? '',
        waitingAmount: waitingNumber?.at(i) ?? 0,
        waitingTime: waitingTime?.at(i) ?? 0,
      });
    }
  }

  const handleDirection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (targetBranch) {
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
        <div className='flex w-full flex-col items-start justify-center gap-1'>
          <div className='flex w-full justify-between gap-2'>
            <div className='flex w-full flex-col items-start justify-center pl-3'>
              <div className='flex w-full items-center justify-between'>
                <div
                  className='flex items-center justify-center gap-2'
                  onClick={handlePage(`/branch/${branchId}`)}
                >
                  <div className='flex w-fit flex-wrap justify-start gap-1'>
                    <span className='flex text-2xl font-extrabold'>
                      {topName}
                    </span>
                    <span className='flex text-2xl font-extrabold'>
                      {bottomName}
                    </span>
                  </div>
                  <Hyperlink className='w-6' />
                </div>
                {type === 'map' ? (
                  <DirectionButton
                    variant='square'
                    onClick={handleDirection}
                    className='self-start'
                  />
                ) : (
                  <span className='mb-2 flex w-[6rem] self-start'>
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
              <div className='flex flex-wrap items-center justify-center gap-2'>
                <span className='text-[1rem] text-lightGrey'>
                  {address ?? ''}
                </span>
                <div className='flex items-center'>
                  <Separator orientation='vertical' className='h-[0.6875rem]' />
                </div>
                <span className='text-[1rem] font-bold text-lightGrey'>
                  {distance}m
                </span>
              </div>
            </div>
          </div>

          <Separator className='my-2' />
          <div className='flex w-full items-center gap-4'>
            {waitingInfos.map((waitingInfo, index) => (
              <Badge
                variant='outline'
                className='w-full gap-2 rounded-[8px] bg-[#]'
                key={index}
              >
                <div className='flex w-full flex-col gap-1 py-2'>
                  <span className='text-[0.85rem]'>{waitingInfo.section}</span>
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
        </div>
      </div>
      <div className='my-3 flex gap-3'></div>
      <Toaster />
    </>
  );
}
