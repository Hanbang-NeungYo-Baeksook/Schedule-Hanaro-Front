// 기존 CallPage

import ListOfCallInquiry from '@/components/Admin/Call/ListOfCallInquiry';
import SearchConditionSetting from '@/components/Admin/Call/SearchConditionSetting';
import ListPagination from '@/components/Admin/ListPagination';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCallList from '@/hooks/query/admin/useGetCallList';
import { Category } from '@/types/enum';
import { useEffect, useState } from 'react';

export type SearchConditions = {
  page: number;
  startedAt?: string;
  endedAt?: string;
  category?: Category;
  keyword?: string;
};

function CallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchConditions, setSearchConditions] = useState<SearchConditions>({
    page: currentPage ?? 1,
    startedAt: undefined,
    endedAt: undefined,
    category: undefined,
    keyword: undefined,
  });

  useEffect(() => {
    setSearchConditions((prevConditions) => ({
      ...prevConditions,
      page: currentPage,
    }));
  }, [currentPage]);

  const { data: calls, isLoading } = useGetCallList(searchConditions);

  if (isLoading || !calls) {
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

  // 검색
  const handleSearch = (conditions: SearchConditions) => {
    setSearchConditions(conditions);
    setCurrentPage(1);
  };

  // 이전 페이지
  const onPrev = () => {
    const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
    setCurrentPage(prevPage);
  };

  // 다음 페이지
  const onNext = () => {
    const nextPage =
      currentPage + 1 < calls?.pagination?.pageSize
        ? currentPage + 1
        : calls?.pagination?.pageSize;
    setCurrentPage(nextPage);
  };

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
        {calls.data ? (
          <ListOfCallInquiry calls={calls.data} currentPage={currentPage} />
        ) : (
          <Skeleton />
        )}
        <div className='my-6'>
          {calls.data && (
            <ListPagination
              firstPage={1}
              currentPage={currentPage - 1}
              setCurrentPage={setCurrentPage}
              totalPage={calls?.pagination?.pageSize ?? 1}
              onPrev={onPrev}
              onNext={onNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CallPage;
