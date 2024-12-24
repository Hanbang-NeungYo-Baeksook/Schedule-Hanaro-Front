import InquiryList from '@/components/Admin/Inquiry/InquiryList';
import ReplyState from '@/components/Admin/Inquiry/ReplyState';
import useGetInquiryList from '@/hooks/query/admin/useGetInquiryList';
import { Category, InquiryStatus } from '@/types/enum';
import { useState } from 'react';

function InquiryPage() {
  const [activeTab, setActiveTab] = useState<InquiryStatus>('답변대기');
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 추가
  const tabs: InquiryStatus[] = ['답변대기', '답변완료'];

  const { data: inquiries } = useGetInquiryList({
    page: 0,
    status: activeTab,
    category: activeCategory,
    search_content: searchQuery,
  });

  if (!inquiries) {
    return <>Loading...</>;
  }
  return (
    <div className='mx-auto max-w-[1300px] px-4'>
      {' '}
      {/* 부모 컨테이너 */}
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
          />
        ) : (
          <div className='mt-36'>
            <span className='text-2xl font-bold text-lightGrey'>
              등록된 1:1 문의가 없습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InquiryPage;
