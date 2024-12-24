import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_ROUTE } from '@/constants/route';
import useGetCustomerHistory from '@/hooks/query/admin/useGetCustomerHistory';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Params = {
  idx: number;
  category: string;
  content: string;
};

const CallComponent = ({
  idx,
  category,
  content,
}: Params & { call_id: number }) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-border px-3 py-5'>
      <div className='space-x-6'>
        <span>{idx}</span>
        <span>{content}</span>
        <Badge variant='outline'>{category}</Badge>
      </div>
      <span className='text-[0.75rem]'>상세보기</span>
    </div>
  );
};

const InquiryComponent = ({
  idx,
  category,
  content,
}: Params & { inquiry_id: number }) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-border px-3 py-5'>
      <div className='space-x-6'>
        <span>{idx}</span>
        <span>{content}</span>
        <Badge variant='outline'>{category}</Badge>
      </div>
      <span className='text-[0.75rem]'>상세보기</span>
    </div>
  );
};

function CustomerInquiryList({ customerId }: { customerId: number }) {
  const [activeCategory, setActiveCategory] = useState('전화문의');
  const { data: historyData } = useGetCustomerHistory(customerId);
  const navigate = useNavigate();
  const handlePage = (route: string) => navigate(route);

  if (
    !historyData ||
    !historyData.phone_inquiries ||
    !historyData.one_to_one_inquiries
  ) {
    return (
      <>
        <Skeleton />
      </>
    );
  }
  return (
    <div className='w-full rounded-[20px] px-5 py-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]'>
      <div className='w-full border-b-[2px] border-border pb-[1px]'>
        <span
          className={cn(
            'cursor-pointer px-3 py-1',
            activeCategory === '전화문의'
              ? 'border-b-[2px] border-lightText text-lightText'
              : 'border-none text-border'
          )}
          onClick={() => setActiveCategory('전화문의')}
        >
          전화 문의
        </span>
        <span
          className={cn(
            'cursor-pointer px-3 py-1',
            activeCategory === '1:1문의'
              ? 'border-b-[2px] border-lightText text-lightText'
              : 'border-none text-border'
          )}
          onClick={() => setActiveCategory('1:1문의')}
        >
          1:1 문의
        </span>
      </div>

      {activeCategory === '전화문의' && (
        <div className='rounded bg-white'>
          {historyData?.phone_inquiries.map(
            (
              {
                call_id,
                category,
                content,
              }: Omit<Params, 'idx'> & { call_id: number },
              idx
            ) => (
              <li
                key={call_id}
                onClick={() =>
                  handlePage(ADMIN_ROUTE.online.call_detail(call_id ?? 1))
                }
                className='list-none'
              >
                <CallComponent
                  idx={idx}
                  call_id={call_id}
                  category={category}
                  content={content}
                />
              </li>
            )
          )}
        </div>
      )}

      {activeCategory === '1:1문의' && (
        <div className='rounded bg-white'>
          {historyData?.one_to_one_inquiries?.map(
            (
              {
                inquiry_id,
                category,
                content,
              }: Omit<Params, 'idx'> & { inquiry_id: number },
              idx
            ) => (
              <li
                key={inquiry_id}
                onClick={() =>
                  handlePage(ADMIN_ROUTE.online.inquiry_detail(inquiry_id ?? 1))
                }
                className='list-none'
              >
                <InquiryComponent
                  idx={idx}
                  inquiry_id={inquiry_id}
                  category={category}
                  content={content}
                />
              </li>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerInquiryList;
