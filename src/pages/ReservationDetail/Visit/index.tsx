import { ReactComponent as Check } from '@/assets/icons/reservation/check.svg';
import AnimationCheck from '@/assets/images/animationCheck.gif';
import Modalbutton from '@/components/Direction/Modal';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Nav from '@/components/Nav/Nav';
import { DirectionButton } from '@/components/ui/direction';
import useDeleteVisit from '@/hooks/query/customer/useDeleteVisit';
import useGetVisitDetail from '@/hooks/query/customer/useGetVisitDetail';
import { useToast } from '@/hooks/use-toast';
import getMyLocation from '@/hooks/useMyLocation';
import '@/index.css';
import { showToast } from '@/pages/Register/Call';
import { Coord } from '@/stores';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export function ReservationDetailVisitPage() {
  const { toast } = useToast();
  const [load, setLoad] = useState(true);
  const currentCoord: Coord = { latitude: 0, longitude: 0 };

  getMyLocation((latitude: number, longitude: number) => {
    currentCoord.latitude = latitude;
    currentCoord.longitude = longitude;
  });

  const navigate = useNavigate();
  const { visitId } = useParams();

  const { data: visit, isLoading } = useGetVisitDetail({
    visit_id: +(visitId ?? 0),
  });

  const { mutate: deleteVisit } = useDeleteVisit();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!visit) {
    return <>방문 예약 없음</>;
  }

  const {
    branch_id: branchId,
    branch_name: branchName,
    visit_num: visitNum,
    waiting_amount: waitAmount,
    waiting_time: waitTime,
    current_num: currentNum,
    x_position: longitude,
    y_position: latitude,
  } = visit;

  const handleDirection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (visit) {
      navigate(
        `/direction?startLat=${currentCoord?.latitude}&startLon=${currentCoord?.longitude}&endLat=${latitude}&endLon=${longitude}&branchId=${branchId}`
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
                {currentNum}
              </span>
              번 입니다.
            </div>
            <div className='mb-4 mt-2 text-8xl font-bold'>
              {visitNum}
              <span className='text-[2rem] font-bold'>번</span>
            </div>
            <div className='mt-2 flex w-full justify-center gap-6 align-middle'>
              <div className='flex items-center text-2xl font-semibold'>
                {branchName}
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
                <div className='text-lg font-bold text-[#464646]'>
                  {waitAmount}명
                </div>
              </div>
              <div className='mt-4 flex justify-between'>
                <div className='text-lg font-medium text-[#666666]'>
                  예상 대기 시간
                </div>
                <div className='text-lg font-bold text-[#464646]'>
                  {waitTime}분
                </div>
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
              onClick={() =>
                deleteVisit({
                  visit_id: +(visitId ?? 0),
                })
              }
            ></Modalbutton>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
