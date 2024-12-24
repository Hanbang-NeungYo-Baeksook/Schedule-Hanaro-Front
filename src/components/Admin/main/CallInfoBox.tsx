import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ADMIN_ROUTE } from '@/constants/route';
import useGetCustomerDetail from '@/hooks/query/admin/useGetCustomerDetail';
import useGetCustomerHistory from '@/hooks/query/admin/useGetCustomerHistory';
import { cn } from '@/lib/utils';
import { AdminCallData } from '@/types/Call';
import { ActiveTab } from '@/types/inquiry';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReplyState from '../Inquiry/ReplyState';

export type Params = {
  changeIdx: (idx: number) => void;
  toggleOpen?: () => void;
  currentIdx: number;
  selectedCall?: AdminCallData;
};

const HistoryComponent = ({
  idx,
  content,
  category,
}: {
  idx: number;
  content: string;
  category: string;
}) => {
  return (
    <div className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-border px-3 py-5'>
      <div className='space-x-2'>
        <span>{idx}</span>
        <span>{content}</span>
        <Badge variant='outline'>{category}</Badge>
      </div>
      <span className='text-[0.75rem]'>상세보기</span>
    </div>
  );
};

function CallInfoBox({
  changeIdx,
  toggleOpen,
  currentIdx,
  selectedCall,
}: Params) {
  const location = useLocation();
  const navigate = useNavigate();
  const handlePage = (route: string) => navigate(route);

  const tabs: ActiveTab[] = ['문의정보', '고객정보'];
  const [activeTab, setActiveTab] = useState<ActiveTab>('문의정보');
  const [activeCategory, setActiveCategory] = useState('전화문의');

  const { data: customerDetail } = useGetCustomerDetail(
    selectedCall?.customer_id ?? 0
  );
  const { data: customerHistory } = useGetCustomerHistory(
    selectedCall?.customer_id ?? 0
  );

  if (!selectedCall || !customerDetail || !customerHistory) {
    return (
      <div className='flex h-full w-full items-center justify-center text-center'>
        <span className='text-lightGrey'>선택된 상담이 없습니다.</span>
      </div>
    );
  }

  const { waiting_num, category, tags, content, memo } = selectedCall;

  const { auth_id, customer_name, phone_number, birth_date } = customerDetail;

  const { phone_inquiries: calls, one_to_one_inquiries: inquiries } =
    customerHistory;

  return (
    <div className='flex h-full flex-col rounded-[20px] bg-white px-4 pb-8 pt-6'>
      <div className='pb-5 pt-3'>
        <ReplyState
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </div>

      {activeTab === '문의정보' && (
        <div className='flex flex-grow flex-col'>
          <div className='relative mt-10 flex flex-grow flex-col justify-between rounded-[50px] border-[1px] border-border'>
            <div className='absolute left-[38%] top-[-20px] flex items-center gap-3 bg-white px-2'>
              <span className='text-4xl font-bold'>{waiting_num}</span>
              <Badge>{category}</Badge>
            </div>
            <div className='flex min-h-80 flex-grow flex-col overflow-auto rounded p-4'>
              <div className='my-3 flex items-center justify-start gap-2'>
                <Badge className='py-1' variant='lightSolid'>
                  # {tags}
                </Badge>
              </div>
              <div className='text-[1.125rem] text-lightGrey'>{content}</div>
            </div>
          </div>
          {location.pathname === '/admin/online' && (
            <div className='mt-4 flex justify-end gap-3'>
              {waiting_num !== currentIdx ? (
                <Button
                  className='w-fit rounded-3xl bg-[#777777] px-4 py-2 hover:bg-[#666]'
                  onClick={() => changeIdx(currentIdx)}
                >
                  현재 고객으로 이동
                </Button>
              ) : (
                <Button
                  className='w-fit rounded-3xl bg-[#777777] px-4 py-2 text-white hover:bg-[#666]'
                  onClick={toggleOpen}
                >
                  상담 내용 {memo ? '확인하기' : '입력하기'}
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === '고객정보' && (
        <div>
          <div className='my-4 flex items-center gap-3'>
            <h3 className='whitespace-nowrap text-lg font-bold text-[#666666]'>
              기본 정보
            </h3>
            <div className='h-[2px] w-full bg-[#666666]'></div>
          </div>
          <ul className='mb-6 space-y-3 px-3 text-gray-600'>
            <li className='flex items-center justify-between'>
              <span>고객명</span>
              <span>{customer_name}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>아이디</span>
              <span>{auth_id}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>전화번호</span>
              <span>{phone_number}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>생년월일</span>
              <span>{dayjs(birth_date).format('YYYY년 MM월 DD일')}</span>
            </li>
          </ul>
          <div className='my-5 flex items-center gap-3'>
            <h3 className='whitespace-nowrap text-lg font-bold text-[#666666]'>
              상담 이력
            </h3>
            <div className='h-[2px] w-full bg-[#666666]'></div>
          </div>
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
          <div className='rounded bg-white'>
            {activeCategory === '전화문의'
              ? calls
                  ?.slice(0, 3)
                  ?.map(({ call_id, content, category }, idx) => (
                    <div
                      key={call_id}
                      onClick={() =>
                        handlePage(ADMIN_ROUTE.online.call_detail(call_id))
                      }
                    >
                      <HistoryComponent
                        idx={idx + 1}
                        content={content}
                        category={category}
                      />
                    </div>
                  ))
              : inquiries
                  ?.slice(0, 3)
                  ?.map(({ inquiry_id, content, category }, idx) => (
                    <div
                      key={inquiry_id}
                      onClick={() =>
                        handlePage(
                          ADMIN_ROUTE.online.inquiry_detail(inquiry_id)
                        )
                      }
                    >
                      <HistoryComponent
                        idx={idx + 1}
                        content={content}
                        category={category}
                      />
                    </div>
                  ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CallInfoBox;
