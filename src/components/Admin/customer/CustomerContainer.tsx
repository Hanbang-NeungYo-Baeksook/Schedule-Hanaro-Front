import { Skeleton } from '@/components/ui/skeleton';
import useGetCustomerList from '@/hooks/query/admin/useGetCustomerList';
import { AdminCustomerData } from '@/types/customer';
import React, { useState } from 'react';
import CustomerBox from './CustomerBox';

function CustomerContainer() {
  const [page] = useState(1);
  const { data: customers } = useGetCustomerList(page);

  if (!customers || !customers.data) {
    <>
      <Skeleton />
    </>;
  }

  return (
    <div className='w-full rounded-[30px] px-5 py-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]'>
      <div className='flex w-full items-center border-b-[2px] border-[#999999] pb-7'>
        <span className='w-[5%] text-center' />
        <span className='font-regular w-[15%] text-center text-[1rem] text-lightGrey'>
          이름
        </span>
        <span className='font-regular w-[20%] text-center text-[1rem] text-lightGrey'>
          전화번호
        </span>
        <span className='font-regular w-[25%] text-center text-[1rem] text-lightGrey'>
          생년월일
        </span>
        <span className='font-regular w-[25%] text-center text-[1rem] text-lightGrey'>
          아이디
        </span>
        <span className='font-regular w-[10%] text-center text-[1rem] text-lightGrey' />
      </div>

      <ul>
        {customers?.data?.map(
          (
            {
              customer_id,
              auth_id,
              customer_name,
              phone_number,
              birth_date,
            }: AdminCustomerData,
            idx
          ) => (
            <React.Fragment key={customer_id}>
              <CustomerBox
                userId={customer_id}
                idx={idx + 1}
                name={customer_name}
                mobile={phone_number}
                birthdt={birth_date}
                authId={auth_id}
              />
            </React.Fragment>
          )
        )}
      </ul>
    </div>
  );
}

export default CustomerContainer;
