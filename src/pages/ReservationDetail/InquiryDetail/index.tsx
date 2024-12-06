import { useParams } from 'react-router-dom';
import {
  mockReservationInquiryAnswerDetails,
  mockReservationInquiryDetails,
} from '@/mock/mockReservationsInquiry';
import Header from '@/components/Header/Header';
import Nav from '@/components/Nav/Nav';
import waitingAnswer from '@/assets/images/waitingAnswer.svg';
import ReservationDetailInquiryTags, {
  HashTag,
} from '../ReservationDetailInquiryTags';
import { useEffect, useState } from 'react';
export function InquiryDetailPage() {
  const { id: inquiryId } = useParams<{ id: string }>();
  const [tags, setTags] = useState<HashTag[]>([]);

  useEffect(() => {
    async function fetchReservationDetails() {
      const fetchedTags = [
        { id: 1, label: '예금' },
        { id: 2, label: '금융상품' },
        { id: 2, label: '대학생' },
      ];
      setTags(fetchedTags);
    }
    fetchReservationDetails();
  }, [inquiryId]);

  const inquiry = mockReservationInquiryDetails.find(
    ({ id }: { id: string }) => id === inquiryId
  );
  const inquiry2 = mockReservationInquiryAnswerDetails.find(
    ({ id }: { id: string }) => id === inquiryId
  );

  if (!inquiry) {
    return <div>문의 정보를 찾을 수 없습니다.</div>;
  }

  const renderHeader = <Header title='답변 상세' />;

  const renderInquiryContent = (
    <div className='flex w-full flex-col gap-[0.5rem] text-left'>
      <ReservationDetailInquiryTags tags={tags} />
      <div className='text-sm text-[#B3B3B3]'>
        {inquiry.date} {inquiry.time}
      </div>
      <div className='text-lg text-[#464646]'>{inquiry.content}</div>
    </div>
  );

  const renderDivider = (
    <div className='flex w-full justify-center'>
      <hr className='w-full' />
    </div>
  );

  return (
    <>
      {renderHeader}
      <div className='spacrem] mx-auto w-[90%] pb-[7rem] pt-[5rem]'>
        <div className='flex w-full flex-col items-center gap-[3rem]'>
          {renderInquiryContent}
          {renderDivider}
          {inquiry2 ? (
            <div className='flex flex-col gap-[0.5rem] text-left'>
              <label className='text-2xl font-bold'>답변 내용</label>
              <div className='text-sm text-[#B3B3B3]'>
                {inquiry2.date2} • {inquiry2.time2}
              </div>
              <div className='text-lg text-[#464646]'>{inquiry2.content2}</div>
            </div>
          ) : (
            <div className='flex w-full flex-col items-center gap-[1rem]'>
              <img src={waitingAnswer} alt='Waiting for answer' />
              <div className='text-center text-xl font-bold'>
                상담사가 고객님의 문의를 처리 중입니다.
              </div>
            </div>
          )}
        </div>
      </div>
      <Nav />
    </>
  );
}
