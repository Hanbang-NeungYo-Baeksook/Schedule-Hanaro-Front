import { ReactComponent as Check } from '@/assets/icons/reservation/check.svg';
import AnimationCheck from '@/assets/images/AnimationCheck.gif';
import Modalbutton from '@/components/Direction/Modal';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Nav from '@/components/Nav/Nav';
import { DirectionButton } from '@/components/ui/direction';
import { useMap } from '@/hooks/map-context';
import { useToast } from '@/hooks/use-toast';
import '@/index.css';
import { BRANCH_MOCK } from '@/mock/branch_mock';
import { showToast } from '@/pages/Register/Call';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export function ReservationDetailVisitPage() {
  const { getCurrentLatitude, getCurrentLongitude } = useMap();
  const { toast } = useToast();
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const { branchId } = useParams();
  if (!branchId) {
    return;
  }

  const branch = BRANCH_MOCK.find(({ id }) => id === branchId);

  const handleDirection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (branch) {
      const { position_x: longitude, position_y: latitude } = branch;
      // TODO: startLat, startLon 현 위치로 수정
      navigate(
        `/direction?startLat=${getCurrentLatitude()}&startLon=${getCurrentLongitude()}&endLat=${latitude}&endLon=${longitude}&branchId=${branchId}`
      );
      showToast(toast, '길 안내를 시작합니다.');
    }
  };

  setTimeout(() => {
    setLoad(false);
  }, 1000);
  return (
    <>
      <div className='mx-auto h-screen w-[90%] flex-col justify-between overflow-y-auto scrollbar-hide'>
        <ReservationDetailHeader />
        <div className='flex w-full flex-col justify-between gap-12'>
          <div className='flex w-full flex-col items-center'>
            <div className='mt-4 flex justify-center'>
              {load ? (
                <img
                  className='mt-3 object-contain pb-[0.325rem]'
                  src={AnimationCheck}
                  alt='Check'
                />
              ) : (
                <Check className='w-[10.5rem]' />
              )}
            </div>
            <div className='mt-4 text-center text-[1.75rem] font-bold text-black'>
              번호표 발급 완료
            </div>
            <div className='mt-4 text-center text-sm font-medium text-[#666666]'>
              1시간 이내 미방문 시<br />
              예약이 취소될 수 있습니다.
            </div>
            <hr className='mt-4 w-[80%]' color='#464646' />
            <div className='mt-4 text-center text-lg font-medium'>
              현재 대기 번호는{' '}
              <span className='text-3xl font-bold text-[#008485]/80'>
                {branchId}
              </span>
              번 입니다.
            </div>
            <div className='mb-4 mt-2 text-8xl font-bold'>
              {branchId}
              <span className='text-[2rem] font-bold'>번</span>
            </div>
            <div className='mt-2 flex w-full justify-center gap-6 align-middle'>
              <div className='flex items-center text-2xl font-semibold'>
                하나은행 성수역점
              </div>
              <DirectionButton onClick={handleDirection} />
            </div>
            <div className='mt-6 w-[85%] rounded-[1.25rem] border border-[#d9d9d9] bg-[#f9f9f9] p-6'>
              <h3 className='flex text-xl font-bold text-black'>대기정보</h3>
              <hr className='my-3' />
              <div className='flex justify-between'>
                <div className='text-lg font-medium text-[#666666]'>
                  현재 대기 인원
                </div>
                <div className='text-lg font-bold text-[#464646]'>10명</div>
              </div>
              <div className='mt-4 flex justify-between'>
                <div className='text-lg font-medium text-[#666666]'>
                  예상 대기 시간
                </div>
                <div className='text-lg font-bold text-[#464646]'>15분</div>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-center justify-self-center pb-[8rem]'>
            <Modalbutton
              buttonTitle='예약 취소'
              buttonVariant='outline'
              buttonSize='h-[3.75rem] w-[90%] rounded-[1.25rem]'
              modalTitle='영업점 예약 취소'
              modalDescription1='취소 시 30분 후부터 재예약이 가능합니다.'
              modalDescription2=''
              modalButtonTitle='확인'
            ></Modalbutton>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
