import { Skeleton } from '@/components/ui/skeleton';
import useGetCustomerDetail from '@/hooks/query/admin/useGetCustomerDetail';
import dayjs from 'dayjs';

function CustomerInfoBox({ customerId }: { customerId: number }) {
  const { data: customerDetail } = useGetCustomerDetail(customerId);

  if (!customerDetail) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  const { auth_id, customer_name, phone_number, birth_date } = customerDetail;

  return (
    <div className='mb-5 flex w-full items-center rounded-[20px] py-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]'>
      <div className='w-[50%] space-y-4 border-r-[1px] border-border px-16'>
        <div className='flex w-full items-center justify-between'>
          <span className='font-regular text-lightGrey'>고객명</span>
          <span className='font-regular'>{customer_name}</span>
        </div>
        <div className='flex w-full items-center justify-between'>
          <span className='font-regular text-lightGrey'>전화번호</span>
          <span>{phone_number}</span>
        </div>
      </div>

      <div className='w-[50%] space-y-4 px-16'>
        <div className='flex w-full items-center justify-between'>
          <span className='font-regular text-lightGrey'>이메일</span>
          <span>{auth_id}</span>
        </div>
        <div className='flex w-full items-center justify-between'>
          <span className='font-regular text-lightGrey'>생년월일</span>
          <span>{dayjs(birth_date).format('YYYY년 MM월 DD일')}</span>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfoBox;
