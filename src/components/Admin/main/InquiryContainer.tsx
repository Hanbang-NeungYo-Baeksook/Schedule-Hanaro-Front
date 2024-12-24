import useGetInquiryList from '@/hooks/query/admin/useGetInquiryList';
import { Category } from '@/types/enum';
import { useState } from 'react';
import InquiryList from '../Inquiry/InquiryList';

function InquiryContainer() {
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: inquiries } = useGetInquiryList({ page: 0 });

  if (!inquiries) {
    return <></>;
  }
  return (
    <div className='mx-auto w-full space-y-5 text-left'>
      <span className='text-2xl font-bold'>1:1 문의</span>
      <div className='flex w-full items-center gap-5'>
        {inquiries.data.length > 0 ? (
          <InquiryList
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            inquiries={inquiries.data}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <div className='mt-20 w-full text-center'>
            <span className='text-2xl font-bold text-lightGrey'>
              등록된 1:1 문의가 없습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InquiryContainer;
