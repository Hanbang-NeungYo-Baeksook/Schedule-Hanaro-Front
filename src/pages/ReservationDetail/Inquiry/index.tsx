import '@/index.css';
import { Button } from '@/components/ui/button';
import Nav from '@/components/Nav/Nav';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Modalbutton from '@/components/Direction/Modal';
import { Separator } from '@/components/ui/separator';
import ReservationDetailInquiryTags from '../ReservationDetailInquiryTags';
import useGetInquiryDetail from '@/hooks/query/customer/useGetInquiryDetail';
import useDeleteInquiry from '@/hooks/query/customer/useDeleteInquiry';
import { Skeleton } from '@/components/ui/skeleton';

export function ReservationDetailInquiryPage() {
  const navigate = useNavigate();
  const { inquiryId } = useParams<{ inquiryId: string }>();

  const { data: inquiry, isLoading } = useGetInquiryDetail({
    inquiry_id: +(inquiryId ?? 0),
  });

  const { mutate: deleteInquiry } = useDeleteInquiry();

  if (isLoading || !inquiry) {
    return (
      <div className='z-10 flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full bg-[#F2F2F2]' />
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
  }

  const { inquiry_num, customer_name, content, tags, category, status } =
    inquiry;

  return (
    <>
      <div className='mx-auto h-screen w-[90%] flex-col justify-between overflow-y-auto scrollbar-hide'>
        <ReservationDetailHeader reservationType='inquiry' />
        <div className='pt-[1rem]'>
          <div className='flex min-h-screen flex-col justify-between gap-[3rem]'>
            <div className='flex flex-col items-center gap-[4rem]'>
              <div className='flex flex-col gap-[2rem]'>
                <div className='flex items-end gap-1'>
                  <span className='text-8xl font-bold'>{inquiry_num}</span>
                  <span className='text-5xl font-bold'>번</span>
                </div>
              </div>
              <div className='flex w-full flex-col gap-[1rem] rounded-[1.25rem] border border-[#d9d9d9] bg-[#f9f9f9] p-6'>
                <div className='flex justify-between'>
                  <div className='text-lg font-medium text-[#666666]'>이름</div>
                  <div className='text-lg font-bold text-[#464646]'>
                    {customer_name}
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='text-lg font-medium text-[#666666]'>
                    상담 종류
                  </div>
                  <div className='text-lg font-bold text-[#464646]'>
                    {category}
                  </div>
                </div>
              </div>
              <div className='flex w-[90%] flex-col gap-[1rem]'>
                <label className='flex text-2xl font-bold'>문의 내용</label>
                <Separator />
                <ReservationDetailInquiryTags tags={tags} />
                {/* <div className='text-left text-sm text-[#B3B3B3]'>
                  {date} {time}
                </div> */}
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
      </div>
      <Nav />
    </>
  );
}
