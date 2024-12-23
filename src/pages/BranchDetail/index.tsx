import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as Addrss } from '@/assets/icons/branch/address.svg';
import { ReactComponent as Hours } from '@/assets/icons/branch/business_hours.svg';
import { ReactComponent as Tel } from '@/assets/icons/branch/tel.svg';
import { ReactComponent as BankImg } from '@/assets/icons/branch/branch_img.svg';

import Nav from '@/components/Nav/Nav';
import { DirectionButton } from '@/components/ui/direction';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '../Register/Call';
import { Separator } from '@radix-ui/react-select';
import BranchDetailHeader from '@/components/Header/BranchDetailHeader';
import useGetBranchDetail from '@/hooks/query/customer/useGetBranchDetail';
import { WaitingInfo } from '@/components/Map/BranchCard';
import { Badge } from '@/components/ui/badge';
import { Coord } from '@/stores';
import getMyLocation from '@/hooks/useMyLocation';
import ReservationButton from '@/components/Direction/BottomFloatingBox/ReservationButton';

export function BranchDetailPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { branchId } = useParams();
  const currentCoord: Coord = { latitude: 0, longitude: 0 };

  getMyLocation((latitude: number, longitude: number) => {
    currentCoord.latitude = latitude;
    currentCoord.longitude = longitude;
  });

  const { data: branch, isLoading } = useGetBranchDetail({
    branch_id: +(branchId ?? -1),
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!branch) {
    return <>No branch</>;
  }

  const {
    branch_name: branchName,
    address,
    tel,
    business_hours,
    x_position: longitude,
    y_position: latitude,
    branch_type: type,
    section_types: sectionType,
    wait_amount: waitingNumber,
    wait_time: waitingTime,
  } = branch;

  const waitingInfos: WaitingInfo[] = [];
  if (type === '방문점' && sectionType) {
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
    if (branch) {
      navigate(
        `/direction?startLat=${currentCoord?.latitude}&startLon=${currentCoord?.longitude}&endLat=${latitude}&endLon=${longitude}&branchId=${branchId}`
      );
      showToast(toast, '길 안내를 시작합니다.');
    }
  };

  return (
    <>
      <BranchDetailHeader branchName={branchName ?? ''} />
      <div className='mx-auto overflow-hidden rounded-lg bg-white'>
        <div>
          <BankImg />
          {/* <img src={branch} alt='bank image' className='w-full' /> */}
          <div className='w-[90%] justify-self-center border-b py-8'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>기본정보</h2>
              <DirectionButton onClick={handleDirection} />
            </div>
            <ul className='list-none'>
              <li className='mt-4 flex items-center justify-start gap-2'>
                <Addrss width={20} height={23} className='relative' />
                <span className="font-['Inter'] text-base font-semibold text-[#464646]">
                  {address}
                </span>
              </li>
              <li className='mt-4 flex items-center justify-start gap-2'>
                <Hours width={20} height={20} />
                <span className="font-['Inter'] text-base font-semibold text-[#464646]">
                  {business_hours}
                </span>
              </li>
              <li className='mt-4 flex items-center justify-start gap-2'>
                <Tel width={16} height={20} />
                <span className="font-['Inter'] text-base font-semibold text-[#464646]">
                  {tel}
                </span>
              </li>
            </ul>
          </div>
          <Separator />
          <div className='w-[90%] justify-self-center py-8'>
            <div className='text-left text-xl font-bold'>대기 정보</div>
            <div className='mt-4 flex items-center gap-4'>
              {waitingInfos.map((waitingInfo, index) => (
                <Badge
                  variant='outline'
                  className='w-full gap-2 rounded-[8px] bg-[#]'
                  key={index}
                >
                  <div className='flex w-full flex-col gap-1 py-2'>
                    <span className='text-left text-[0.85rem]'>
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
          </div>
          <ReservationButton branchId={+(branchId ?? 0)} />
        </div>
        <Toaster />
      </div>
      <div className='relative pb-[100px] min-[435px]:pb-[110px] min-[800px]:pb-[110px]'></div>
      <Nav />
    </>
  );
}
