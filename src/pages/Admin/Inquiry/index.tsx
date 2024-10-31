// src/pages/Admin/Inquiry/index.tsx
import InquiryList from '@/components/Admin/Inquiry/InquiryList';
import ReplyState from '@/components/Admin/Inquiry/ReplyState';
import { useState } from 'react';

function InquiryPage() {
  const [activeTab, setActiveTab] = useState<'답변대기' | '답변완료' | '전체'>(
    '전체'
  );
  const [activeCategory, setActiveCategory] = useState<string>('전체'); // 카테고리 상태 추가

  return (
    <>
      <div className='mb-10 mt-6 flex flex-col items-center'>
        <ReplyState activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* InquiryList에 activeTab, activeCategory, setActiveCategory 전달 */}
      <InquiryList
        activeTab={activeTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </>
  );
}

export default InquiryPage;
