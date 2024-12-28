import waitingAnswer from '@/assets/images/waitingAnswer.svg';
import Header from '@/components/Header/Header';
import LoadingBasic from '@/components/Loading';
import Nav from '@/components/Nav/Nav';
import { Separator } from '@/components/ui/separator';
import useGetInquiryReply from '@/hooks/query/customer/useGetInquiryReply';
import { useParams } from 'react-router-dom';
import ReservationDetailInquiryTags from '../ReservationDetailInquiryTags';
export function InquiryDetailPage() {
  const { id: inquiryId } = useParams<{ id: string }>();

  const { data: response, isLoading: isLoading } = useGetInquiryReply({
    inquiry_id: +(inquiryId ?? 0),
  });

  if (isLoading || !response) {
    return <LoadingBasic />;
  }

  const { content, status, reply } = response;
  const tags = ['예금', '적금'];
  return (
    <>
      <>
        <Header title='답변 상세' />
        <div className='mx-auto w-[90%] pb-[7rem] pt-[5rem]'>
          <div className='flex w-full flex-col items-start gap-[2rem]'>
            <div className='flex w-full flex-col gap-[0.5rem] space-y-2 text-left'>
              <span className='text-[1.375rem] font-bold'>문의 내용</span>
              <ReservationDetailInquiryTags tags={tags} />
              <div className='pt-3 text-lg text-[#464646]'>{content}</div>
            </div>
            <Separator />
            {status === '답변완료' ? (
              <div className='flex w-full flex-col gap-[0.5rem] text-left'>
                <label className='text-[1.375rem] font-bold'>답변 내용</label>
                <div className='rounded-[15px] border-[1px] border-border bg-[#FAFAFA] p-4 text-lg text-[#464646]'>
                  {reply}
                </div>
              </div>
            ) : (
              <div className='mt-5 flex w-full flex-col items-center gap-[1rem]'>
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
