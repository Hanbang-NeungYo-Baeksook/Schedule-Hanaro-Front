import InquiryList from '@/components/Admin/Inquiry/InquiryList';
import ReplyState from '@/components/Admin/Inquiry/ReplyState';
import ListPagination from '@/components/Admin/ListPagination';
import useGetInquiryList from '@/hooks/query/admin/useGetInquiryList';
import { Category, InquiryStatus } from '@/types/enum';
import { ActiveTab } from '@/types/inquiry';
import { useState } from 'react';

function InquiryPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('답변대기');
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 추가
  const tabs: ActiveTab[] = ['답변대기', '답변완료'];

  const [currentPage, setCurrentPage] = useState(1);

  const { data: inquiries } = useGetInquiryList({
    page: currentPage,
    status: activeTab as InquiryStatus,
    category: activeCategory,
    search_content: searchQuery,
  });

  if (!inquiries) {
    return <>Loading...</>;
  }

  const onPrev = () => {
    const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 0;
    setCurrentPage(prevPage);
  };

  const onNext = () => {
    const nextPage =
      currentPage + 1 < inquiries?.total_pages
        ? currentPage + 1
        : inquiries?.total_pages - 1;
    setCurrentPage(nextPage);
  };

  return (
    <div className='mx-auto max-w-[1300px] px-4'>
      <div className='mx-auto mb-10 mt-6 flex w-[40rem] flex-col items-center'>
        <ReplyState
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </div>
      <div className='w-full'>
        {inquiries?.data.length > 0 ? (
          <InquiryList
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            inquiries={inquiries?.data}
            totalItems={inquiries?.total_items}
            currentPage={currentPage}
          />
        ) : (
          <div className='mt-36'>
            <span className='text-2xl font-bold text-lightGrey'>
              등록된 1:1 문의가 없습니다.
            </span>
          </div>
        )}
      </div>
      <div className='my-6'>
        {inquiries?.data.length > 0 && (
          <ListPagination
            firstPage={1}
            currentPage={currentPage - 1}
            setCurrentPage={setCurrentPage}
            totalPage={inquiries?.total_pages ?? 1}
            onPrev={onPrev}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}

export default InquiryPage;
