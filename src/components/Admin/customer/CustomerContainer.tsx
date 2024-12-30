import { Skeleton } from '@/components/ui/skeleton';
import useGetCustomerList from '@/hooks/query/admin/useGetCustomerList';
import { AdminCustomerData } from '@/types/customer';
import React, { useState } from 'react';
import ListPagination from '../ListPagination';
import CustomerBox from './CustomerBox';

function CustomerContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: customers } = useGetCustomerList(currentPage);

  if (!customers || !customers.data) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  // 이전 페이지
  const onPrev = () => {
    const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
    setCurrentPage(prevPage);
  };

  // 다음 페이지
  const onNext = () => {
    const nextPage =
      currentPage + 1 < customers.total_pages
        ? currentPage + 1
        : customers.total_pages;
    setCurrentPage(nextPage);
  };

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
                idx={(currentPage - 1) * 10 + (idx + 1)}
                name={customer_name}
                mobile={phone_number}
                birthdt={birth_date}
                authId={auth_id}
              />
            </React.Fragment>
          )
        )}
      </ul>

      <div className='my-6'>
        {customers?.data?.length > 0 && (
          <ListPagination
            firstPage={1}
            currentPage={currentPage - 1}
            setCurrentPage={setCurrentPage}
            totalPage={customers?.total_pages ?? 1}
            onPrev={onPrev}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}

export default CustomerContainer;
