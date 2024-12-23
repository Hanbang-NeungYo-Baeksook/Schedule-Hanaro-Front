import { useParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Nav from '@/components/Nav/Nav';
import waitingAnswer from '@/assets/images/waitingAnswer.svg';
import ReservationDetailInquiryTags from '../ReservationDetailInquiryTags';
import { Separator } from '@/components/ui/separator';
import useGetInquiryReply from '@/hooks/query/customer/useGetInquiryReply';
export function InquiryDetailPage() {
  const { id: inquiryId } = useParams<{ id: string }>();

  const { data: response, isLoading: isLoading } = useGetInquiryReply({
    inquiry_id: +(inquiryId ?? 0),
  });

  if (isLoading) {
    <>Loading...</>;
  }

  if (!response) {
    return <div>문의 정보를 찾을 수 없습니다.</div>;
  }

  const { content, status, reply } = response;
  const tags = ['예금', '적금'];
  return (
    <>
      <>
        <Header title='답변 상세' />
        <div className='mx-auto w-[90%] pb-[7rem] pt-[5rem]'>
          <div className='flex w-full flex-col items-center gap-[3rem]'>
            <div className='flex w-full flex-col gap-[0.5rem] text-left'>
              <ReservationDetailInquiryTags tags={tags} />
              <div className='text-lg text-[#464646]'>{content}</div>
            </div>
            <Separator />
            {status == '답변완료' ? (
              <div className='flex flex-col gap-[0.5rem] text-left'>
                <label className='text-2xl font-bold'>답변 내용</label>
                <div className='text-lg text-[#464646]'>{reply}</div>
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
    </>
  );
}
