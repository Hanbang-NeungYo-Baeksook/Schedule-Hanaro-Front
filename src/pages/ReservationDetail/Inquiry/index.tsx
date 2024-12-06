import '@/index.css';
import { Button } from '@/components/ui/button';
import Nav from '@/components/Nav/Nav';
import { useNavigate, useParams } from 'react-router-dom';
import { mockReservationInquiryDetails } from '@/mock/mockReservationsInquiry';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Modalbutton from '@/components/Direction/Modal';
import ReservationDetailInquiryTags, {
  HashTag,
} from '../ReservationDetailInquiryTags';
import { useEffect, useState } from 'react';

export function ReservationDetailInquiryPage() {
  const { id } = useParams<{ id: string }>();
  const [tags, setTags] = useState<HashTag[]>([]);

  useEffect(() => {
    async function fetchReservationDetails() {
      const fetchedTags = [
        { id: 1, label: '예금' },
        { id: 2, label: '금융상품' },
        { id: 3, label: '대학생' },
      ];
      setTags(fetchedTags);
    }
    fetchReservationDetails();
  }, [id]);

  const navigate = useNavigate();
  const reservation = mockReservationInquiryDetails.find(
    (res) => res.id === id
  );
  if (!reservation) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  const { name, phone, content, consultationType, date, time, waitingNumber } =
    reservation;

  return (
    <>
      <div className='mx-auto w-[90%] justify-self-center'>
        <ReservationDetailHeader />
        <body className='pt-[5rem]'>
          <div className='flex min-h-screen flex-col justify-between gap-[3rem]'>
            <div className='flex flex-col items-center gap-[4rem]'>
              <div className='flex flex-col gap-[2rem]'>
                <div className='text-lg font-medium'>
                  현재 대기 번호는{' '}
                  <span className='text-3xl font-bold text-[#008485]/80'>
                    {waitingNumber}
                  </span>
                  번 입니다.
                </div>
                <div className='text-8xl font-bold'>{waitingNumber}</div>
              </div>
              <div className='flex w-full flex-col gap-[1rem] rounded-[1.25rem] border border-[#d9d9d9] bg-[#f9f9f9] p-6'>
                <div className='flex justify-between'>
                  <div className='text-lg font-medium text-[#666666]'>이름</div>
                  <div className='text-lg font-bold text-[#464646]'>{name}</div>
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
              </div>
              <div className='flex w-[90%] flex-col gap-[1rem]'>
                <label className='flex text-2xl font-bold'>문의 내용</label>
                <hr className='border-2' />
                <ReservationDetailInquiryTags tags={tags} />
                <div className='text-left text-sm text-[#B3B3B3]'>
                  {date} {time}
                </div>
                <div
                  className='overflow-hidden text-ellipsis text-left text-lg text-[#464646]'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {content}
                </div>
              </div>
            </div>

            <div className='flex w-full gap-[1rem] pb-[7rem]'>
              <Modalbutton
                buttonTitle='문의 취소'
                buttonVariant='ghost'
                buttonSize='h-[3.75rem] w-1/3 text-xl'
                modalTitle='1:1 문의 취소'
                modalDescription1=''
                modalDescription2='취소시에는 다시 상담 신청을 하셔야합니다.'
                modalButtonTitle='확인'
                navigateTo='/reservation/inquiry'
              ></Modalbutton>

              <Button
                className='h-[3.75rem] w-2/3 py-[1.125rem] text-xl font-bold'
                variant={'default'}
                onClick={() => navigate(`/reservation/inquiry/${id}/detail`)}
              >
                문의 상세보기
              </Button>
            </div>
          </div>
        </body>
      </div>
      <Nav />
    </>
  );
}
