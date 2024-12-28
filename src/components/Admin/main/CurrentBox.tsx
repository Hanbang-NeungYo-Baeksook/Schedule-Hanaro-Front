import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCustomerDetail from '@/hooks/query/admin/useGetCustomerDetail';
import useGetCustomerHistory from '@/hooks/query/admin/useGetCustomerHistory';
import usePatchCallComplete from '@/hooks/query/admin/usePatchCallComplete';
import { AdminCallData } from '@/types/Call';
import { AdminCustomerDetail, AdminCustomerHistory } from '@/types/customer';
import dayjs from 'dayjs';
import CallTimer from './CallTimer';

function CurrentBox({
  progress,
  toggleOpen,
}: {
  progress: AdminCallData;
  toggleOpen: () => void;
}) {
  const {
    id: callId,
    waiting_num,
    start_time,
    reservation_time,
    customer_id,
  } = progress;

  console.log(progress);

  const { data: customerDetail } = useGetCustomerDetail(customer_id ?? 0);
  const { data: customerHistory } = useGetCustomerHistory(customer_id ?? 0);

  const { mutate: patchComplete } = usePatchCallComplete();

  const completeCouns = () => {
    patchComplete(callId);
    toggleOpen();
  };

  if (
    !progress ||
    !customerDetail ||
    !customerHistory ||
    !progress.start_time
  ) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  const {
    customer_name: user_name,
    auth_id,
    phone_number: mobile,
    birth_date: birth_dt,
  }: AdminCustomerDetail = customerDetail;

  const {
    phone_inquiries: calls,
    one_to_one_inquiries: inquiries,
  }: AdminCustomerHistory = customerHistory;

  return (
    <div className='z-10 flex w-[30%] flex-col items-center justify-center'>
      <div className='relative z-10 h-[50%] w-full max-w-md bg-lightGrey px-4 pt-5'>
        <CallTimer start_time={start_time as string} />

        <div className='z-30 mb-6 text-center text-white'>
          <p className='text-sm font-semibold'>현재 순번 고객</p>
          <h1 className='text-4xl font-bold'>{waiting_num}번</h1>
        </div>

        <div className='z-30 mb-6 space-y-2 rounded-[30px] bg-white px-4 py-6 shadow-[0px_4px_10px_5px_rgba(0,0,0,0.1)]'>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              고객명
            </span>
            <span>{user_name}</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              아이디
            </span>
            <span>{auth_id}</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              전화번호
            </span>
            <span>{mobile}</span>
          </p>
          <p className='flex items-center justify-between text-sm'>
            <span className='font-regular font-[0.75rem] text-lightGrey'>
              생년월일
            </span>
            <span>{dayjs(birth_dt).format('YYYY년 MM월 DD일')}</span>
          </p>
        </div>
      </div>

      <div className='relative z-10 flex h-[58%] w-full max-w-md flex-col justify-between rounded-lg bg-[#fafafa] p-4'>
        <div>
          <p className='mb-2 mt-2'>
            <span className='mr-3 text-[0.875rem] font-bold text-black'>
              상담정보
            </span>
          </p>
          <div className='mb-4 space-y-2 rounded-[10px] border-[0.5px] border-border bg-[#fff] p-4'>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                예정 시작 시간
              </span>
              <span>
                {dayjs(reservation_time).format('MM월 DD일 HH시 mm분')}
              </span>
            </p>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                실제 시작 시간
              </span>
              <span>{dayjs(start_time).format('MM월 DD일 HH시 mm분')}</span>
            </p>
          </div>

          <p className='mb-2 text-[0.875rem] font-bold text-main'>
            <span className='mr-3 text-black'>상담이력</span>
          </p>
          <div className='mb-4 space-y-2 rounded-[10px] border-[0.5px] border-border bg-[#fff] p-4'>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                전화문의
              </span>
              <span>{calls?.length ?? 0}회</span>
            </p>
            <p className='flex items-center justify-between text-sm'>
              <span className='font-regular font-[0.75rem] text-lightGrey'>
                1:1 문의
              </span>
              <span>{inquiries?.length ?? 0}회</span>
            </p>
          </div>
        </div>

        <Button
          className='hover w-full rounded-lg bg-gray-800 py-2 text-white hover:bg-gray-700'
          onClick={completeCouns}
        >
          상담 완료
        </Button>
      </div>
    </div>
  );
}

export default CurrentBox;
