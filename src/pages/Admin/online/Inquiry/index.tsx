import InquiryList from '@/components/Admin/Inquiry/InquiryList';
import ReplyState from '@/components/Admin/Inquiry/ReplyState';
import useGetInquiryList from '@/hooks/query/admin/useGetInquiryList';
import { ActiveTab } from '@/types/inquiry';
import { useState } from 'react';

function InquiryPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('답변대기');
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 추가
  const tabs: ActiveTab[] = ['답변대기', '답변완료'];

  const { data: inquiries } = useGetInquiryList({
    page: 0,
    // status: activeTab
    // category: activeCategory,
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
        <InquiryList
          activeTab={activeTab}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery} // 검색어 전달
          setSearchQuery={setSearchQuery} // 검색 상태 업데이트 함수 전달
          inquiries={inquiries?.data}
        />
      </div>
    </div>
  );
}

export default InquiryPage;
