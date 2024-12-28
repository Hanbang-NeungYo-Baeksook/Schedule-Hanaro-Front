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
import { Skeleton } from '@/components/ui/skeleton';
import LoadingBasic from '@/components/Loading';

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
    latitude: currentCoord.latitude,
    longitude: currentCoord.longitude,
  });

  if (isLoading || !branch) {
    // return (
    //   <div className='z-10 flex items-center space-x-4'>
    //     <Skeleton className='h-12 w-12 rounded-full bg-[#F2F2F2]' />
    //     <div className='w-full space-y-2'>
    //       <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
    //       <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
    //     </div>
    //   </div>
    // );
    return <LoadingBasic />;
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

  const formatPhoneNumber = (phone: string): string => {
    // 10자리: 지역번호(2자리) + 8자리 번호 (예: 021231234 -> 02-123-1234)
    if (/^02\d{7,8}$/.test(phone)) {
      return phone.replace(/^(\d{2})(\d{3,4})(\d{4})$/, '$1-$2-$3');
    }

    // 10자리: 지역번호(3자리) + 7자리 번호 (예: 0511234567 -> 051-123-4567)
    if (/^\d{10}$/.test(phone)) {
      return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
    }

    // 11자리: 휴대폰 번호 (예: 01012345678 -> 010-1234-5678)
    if (/^\d{11}$/.test(phone)) {
      return phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }

    // 유효하지 않은 전화번호 형식
    throw new Error('유효하지 않은 전화번호 형식입니다.');
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
                  {formatPhoneNumber(tel)}
                </span>
              </li>
            </ul>
          </div>
          <Separator />
          <div className='w-[90%] justify-self-center py-8'>
            <div className='text-left text-xl font-bold'>대기 정보</div>
            <div className='mb-10 mt-4 flex items-center gap-4'>
              {waitingInfos.map((waitingInfo, index) => (
                <Badge
                  variant='outline'
                  className='w-full cursor-default gap-2 rounded-[8px] bg-[#] hover:bg-white'
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
            <ReservationButton branchId={+(branchId ?? 0)} />
          </div>
        </div>
        <Toaster />
      </div>
      <div className='relative pb-[100px] min-[435px]:pb-[110px] min-[800px]:pb-[110px]'></div>
      <Nav />
    </>
  );
}
