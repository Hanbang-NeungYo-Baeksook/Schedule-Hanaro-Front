// 기존 CallPage

import ListOfCallInquiry from '@/components/Admin/Call/ListOfCallInquiry';
import SearchConditionSetting from '@/components/Admin/Call/SearchConditionSetting';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCallList from '@/hooks/query/admin/useGetCallList';
import { useState } from 'react';

export type SearchConditions = {
  page: number;
  startedAt?: string;
  endedAt?: string;
  category?: string;
  keyword?: string;
};

function CallPage() {
  const [searchConditions, setSearchConditions] = useState<SearchConditions>({
    page: 1,
    startedAt: undefined,
    endedAt: undefined,
    category: undefined,
    keyword: undefined,
  });

  const { data: calls } = useGetCallList(searchConditions);

  // 검색
  const handleSearch = (conditions: SearchConditions) =>
    setSearchConditions(conditions);

  return (
    <div className='mx-auto max-w-[1300px] px-4'>
      <div className='mb-10 mt-6 flex w-full flex-col items-center'>
        <SearchConditionSetting
          searchConditions={searchConditions}
          onSearch={handleSearch}
        />
      </div>
      <div className='w-full'>
        <h1 className='mb-4 w-full text-left text-xl font-extrabold text-black'>
          검색 목록
        </h1>
        {calls && calls.data ? (
          <ListOfCallInquiry inquiries={calls.data} />
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

export default CallPage;
