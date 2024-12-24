import useGetInquiryList from '@/hooks/query/admin/useGetInquiryList';
import { useState } from 'react';
import InquiryList from '../Inquiry/InquiryList';

function InquiryContainer() {
  const [activeTab] = useState<'답변대기' | '답변완료'>('답변대기');
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: inquiries } = useGetInquiryList({ page: 0 });

  if (!inquiries) {
    return <></>;
  }
  return (
    <div className='mx-auto w-full space-y-5 text-left'>
      <span className='text-2xl font-bold'>1:1 문의</span>
      <div className='flex w-full items-center gap-5'>
        <InquiryList
          activeTab={activeTab}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          inquiries={inquiries.data}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

export default InquiryContainer;
