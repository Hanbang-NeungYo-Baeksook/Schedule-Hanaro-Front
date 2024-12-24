import '@/index.css';
import Nav from '@/components/Nav/Nav';
import { useParams } from 'react-router-dom';
import ReservationDetailHeader from '@/components/Header/ReservationDetailHeader';
import Modalbutton from '@/components/Direction/Modal';
import useGetCallDetail from '@/hooks/query/customer/useGetCallDetail';
import ReservationDetailInquiryTags from '../ReservationDetailInquiryTags';
import { Separator } from '@/components/ui/separator';
import useDeleteCall from '@/hooks/query/customer/useDeleteCall';
export function ReservationDetailCallPage() {
  const { callId } = useParams<{ callId: string }>();

  const { data: call, isLoading } = useGetCallDetail({
    call_id: +(callId ?? 0),
  });

  const { mutate: deleteCall } = useDeleteCall();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!call) {
    return <div>예약 정보를 찾을 수 없습니다.</div>;
  }

  console.log('🚀 ~ ReservationDetailCallPage ~ call:', call);

  const {
    call_date,
    call_time,
    call_num,
    category,
    content,
    customer_name,
    tags,
    wait_num,
    estimated_wait_time,
  } = call;

  function ReservationInfoItem({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) {
    return (
      <div className='flex justify-between'>
        <div className='text-lg font-medium text-[#666666]'>{label}</div>
        <div className='text-lg font-bold text-[#464646]'>{value}</div>
      </div>
    );
  }

  return (
    <>
      <div className='mx-auto h-screen w-[90%] flex-col justify-between overflow-y-auto scrollbar-hide'>
        <ReservationDetailHeader />
        <div className='flex h-screen flex-col justify-between gap-5'>
          <div className='flex flex-col gap-[5rem]'>
            <div className='flex flex-col gap-[2rem]'>
              <div className='text-center text-lg font-medium'>
                현재 대기 중인 인원은{' '}
                <span className='text-3xl font-bold text-[#008485]/80'>
                  {wait_num}
                </span>
                명 입니다.
              </div>
              <div className='flex items-end justify-center gap-[0.2rem]'>
                <span className='text-8xl font-bold'>{call_num}</span>
                <span className='pb-2 text-3xl font-bold'>번</span>
              </div>
              <div className='justify-center gap-6'>
                <div className='text-2xl font-semibold'>
                  {estimated_wait_time}분 후
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[1rem]'>
              <label className='ml-2 self-start text-2xl font-bold'>
                예약상세정보
              </label>
              <div className='flex flex-col gap-[1rem] rounded-[1.25rem] border border-[#d9d9d9] bg-[#f9f9f9] p-6'>
                <ReservationInfoItem label='이름' value={customer_name} />
                <ReservationInfoItem label='상담 종류' value={category} />
                <ReservationInfoItem label='예약 일자' value={call_date} />
                <ReservationInfoItem label='예약 일시' value={call_time} />
              </div>
            </div>
          </div>
          <div className='mt-1 flex w-[90%] flex-col gap-[1rem]'>
            <label className='flex text-2xl font-bold'>문의 내용</label>
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

          <div className='mt-5 flex flex-col pb-[10rem]'>
            <Modalbutton
              buttonTitle='상담 취소'
              buttonVariant='outline'
              buttonSize='h-[3.75rem]  rounded-[1.25rem] py-[1.125rem] text-xl'
              modalTitle='전화 상담 취소'
              modalDescription1=''
              modalDescription2='취소시에는 다시 상담 신청을 하셔야합니다.'
              modalButtonTitle='확인'
              navigateTo='/reservation/call'
              onClick={() =>
                deleteCall({
                  call_id: +(callId ?? 0),
                })
              }
            />
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
