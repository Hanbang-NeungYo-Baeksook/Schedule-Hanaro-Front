import Modalbutton from '@/components/Direction/Modal';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import LoadingBasic from '@/components/Loading';
import Nav from '@/components/Nav/Nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useDeleteInquiry from '@/hooks/query/customer/useDeleteInquiry';
import useGetInquiryDetail from '@/hooks/query/customer/useGetInquiryDetail';
import '@/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationDetailInquiryTags from '../ReservationDetailInquiryTags';

export function ReservationDetailInquiryPage() {
  const navigate = useNavigate();
  const { inquiryId } = useParams<{ inquiryId: string }>();

  const { data: inquiry, isLoading } = useGetInquiryDetail({
    inquiry_id: +(inquiryId ?? 0),
  });

  const { mutate: deleteInquiry } = useDeleteInquiry();

  if (isLoading || !inquiry) {
    return <LoadingBasic />;
  }

  const {
    inquiry_num,
    // customer_name,
    content,
    tags,
    category,
    status,
    waiting_amount,
  } = inquiry;

  return (
    <>
      <ReservationDetailHeader reservationType='inquiry' />
      <div className='mx-auto h-screen min-h-screen w-[90%] overflow-y-auto scrollbar-hide'>
        <div className='flex h-full flex-col items-stretch justify-between pt-[5rem]'>
          <div className='flex flex-col items-center gap-[2rem]'>
            <div className='text-center text-lg font-medium'>
              현재 대기 중인 인원은{' '}
              <span className='text-3xl font-bold text-[#008485]/80'>
                {waiting_amount}
              </span>
              명 입니다.
            </div>
            <div className='flex items-end justify-center gap-[.2rem]'>
              <span className='text-8xl font-bold'>{inquiry_num}</span>
              <span className='text-5xl font-bold'>번</span>
            </div>
            <div className='flex w-[90%] flex-col gap-[1rem]'>
              <div className='flex items-center gap-[1rem]'>
                <label className='flex text-2xl font-bold'>문의 내용</label>
                <Badge className='px-4 py-1 text-[1rem]'>{category}</Badge>
              </div>
              <Separator />
              <ReservationDetailInquiryTags tags={tags} />
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
            {status === '답변 대기중' && (
              <Modalbutton
                buttonTitle='문의 취소'
                buttonVariant='ghost'
                buttonSize='h-[3.75rem] w-1/3 text-xl'
                modalTitle='1:1 문의 취소'
                modalDescription1=''
                modalDescription2='취소시에는 다시 상담 신청을 하셔야합니다.'
                modalButtonTitle='확인'
                onClick={() =>
                  deleteInquiry({ inquiry_id: +(inquiryId ?? -1) })
                }
              />
            )}

            <Button
              className='h-[3.75rem] w-full py-[1.125rem] text-xl font-bold'
              variant={'default'}
              onClick={() =>
                navigate(`/reservation/inquiry/${inquiryId}/detail`)
              }
            >
              문의 상세보기
            </Button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
