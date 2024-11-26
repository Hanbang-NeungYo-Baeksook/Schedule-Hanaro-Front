import '@/index.css';
import Nav from '@/components/Nav/Nav';
import { useParams } from 'react-router-dom';
import { mockReservationCallDetails } from '@/mock/mockReservationsCall';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Modalbutton from '@/components/Direction/Modal';
import ReservationDetailCallTags, {
  HashTag,
} from '../ReservationDetailCallTags';
import { useEffect, useState } from 'react';
export function ReservationDetailCallPage() {
  const { id } = useParams<{ id: string }>();
  const [tags, setTags] = useState<HashTag[]>([]);

  useEffect(() => {
    async function fetchReservationDetails() {
      const fetchedTags = [
        { id: 1, label: '예금' },
        { id: 2, label: '금융상품' },
      ];
      setTags(fetchedTags);
    }
    fetchReservationDetails();
  }, [id]);

  const reservation = mockReservationCallDetails.find((res) => res.id === id);
  if (!reservation) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  const {
    name,
    phone,
    consultationType,
    date,
    time,
    waitingNumber,
    waitingTime,
  } = reservation;
  return (
    <>
      <div className='w-[90%] justify-self-center'>
        <body className='w-full flex-col items-center justify-center gap-[2.5rem]'>
          <ReservationDetailHeader />
          <div className='flex h-screen flex-col justify-between'>
            <div className='flex flex-col gap-[5rem]'>
              <div className='flex flex-col gap-[2rem]'>
                <div className='text-center text-lg font-medium'>
                  현재 대기 번호는{' '}
                  <span className='text-3xl font-bold text-[#008485]/80'>
                    {waitingNumber}
                  </span>
                  번 입니다.
                </div>
                <div className='text-8xl font-bold'>{waitingNumber}</div>
                <div className='justify-center gap-6'>
                  <div className='text-2xl font-semibold'>
                    {waitingTime}분 후
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-[1rem]'>
                <ReservationDetailCallTags title='예약 상세 정보' tags={tags} />
                <div className='flex flex-col gap-[1rem] rounded-[1.25rem] border border-[#d9d9d9] bg-[#f9f9f9] p-6'>
                  <div className='flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      이름
                    </div>
                    <div className='text-lg font-bold text-[#464646]'>
                      {name}
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      전화번호
                    </div>
                    <div className='text-lg font-bold text-[#464646]'>
                      {phone}
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      상담 종류
                    </div>
                    <div className='text-lg font-bold text-[#464646]'>
                      {consultationType}
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      예약 일자
                    </div>
                    <div className='text-lg font-bold text-[#464646]'>
                      {date}
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='text-lg font-medium text-[#666666]'>
                      예약 일시
                    </div>
                    <div className='text-lg font-bold text-[#464646]'>
                      {time}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col pb-[11rem]'>
              <Modalbutton
                buttonTitle='상담 취소'
                buttonVariant='outline'
                buttonSize='h-[3.75rem]  rounded-[1.25rem] py-[1.125rem] text-xl'
                modalTitle='전화 상담 취소'
                modalDescription1=''
                modalDescription2='취소시에는 다시 상담 신청을 하셔야합니다.'
                modalButtonTitle='확인'
                navigateTo='/reservation/call'
              />
            </div>
          </div>
        </body>
      </div>

      <Nav />
    </>
  );
}
