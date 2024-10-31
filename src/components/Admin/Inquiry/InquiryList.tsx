import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../ui/accordion';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import FilterAndSearch from './FilterAndSearch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Inquiry 타입 정의
type Inquiry = {
  id: string;
  title: string;
  status: '답변대기' | '답변완료';
  category: string;
  time: string;
};

function InquiryList({
  activeTab,
  activeCategory,
  setActiveCategory,
}: {
  activeTab: '답변대기' | '답변완료' | '전체';
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) {
  const inquiries: Inquiry[] = [
    {
      id: '1',
      title: '안녕하세요 문의드리려고 했다가 안했다가 합니다',
      status: '답변대기',
      category: '예적금',
      time: '10분 전',
    },
    {
      id: '2',
      title: '안녕하세요 좀 궁금한게 있는...',
      status: '답변대기',
      category: '대출',
      time: '20분 전',
    },
    {
      id: '3',
      title: '안녕하세요, 예금 관련 문의드립니다.',
      status: '답변완료',
      category: '예적금',
      time: '1시간 전',
    },
    {
      id: '4',
      title: '펀드 관련 문의드립니다.',
      status: '답변완료',
      category: '펀드',
      time: '3시간 전',
    },
    {
      id: '5',
      title: '외환 관련해서 문의드려요.',
      status: '답변대기',
      category: '외환',
      time: '5시간 전',
    },
  ];

  const filteredInquiries = inquiries.filter(
    ({ status, category }) =>
      (activeTab === '전체' || status === activeTab) &&
      (activeCategory === '전체' || category === activeCategory)
  );

  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div
      className='font-inter mx-auto max-w-3xl rounded-lg border-gray-200 bg-white p-6 text-[1.25rem] font-bold leading-normal shadow-lg'
      style={{
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className='font-inter mb-4 flex items-center justify-between border-b pb-4 font-normal leading-normal'>
        <h2 className='text-[1.25rem] font-bold text-gray-800'>
          총{' '}
          <span className='text-[1.5rem] font-extrabold text-teal-600'>
            {filteredInquiries.length}
          </span>
          건
        </h2>
        <FilterAndSearch setActiveCategory={setActiveCategory} />
      </div>

      <Accordion type='single' collapsible>
        {filteredInquiries.map(
          ({ id, title, status, category, time }, index) => (
            <AccordionItem key={id} value={id}>
              <div className='font-inter flex items-center justify-between py-4 font-normal leading-normal'>
                <div className='flex items-center space-x-2'>
                  <span className='text-[1.25rem] font-bold text-gray-700'>
                    {index + 1}
                  </span>
                  <span className='text-[1.375rem] font-bold text-gray-800'>
                    {title.length <= 15
                      ? title
                      : `${title.substring(0, 15)}...`}
                  </span>
                  <Badge
                    variant='lightSolid'
                    className={`rounded-full px-2 py-0.5 text-[0.875rem] font-normal ${
                      status === '답변대기'
                        ? 'bg-teal-50 text-teal-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {category}
                  </Badge>
                </div>
                {status === '답변완료' ? (
                  <span
                    className='cursor-pointer text-sm font-semibold text-gray-500'
                    onClick={() => navigate('/admin/inquiry/answerDetail')}
                  >
                    상세보기 &gt;
                  </span>
                ) : (
                  <AccordionTrigger
                    className='flex items-center text-[1rem] font-normal text-gray-500'
                    onClick={() =>
                      setExpandedItem(expandedItem === id ? null : id)
                    }
                  >
                    {expandedItem === id ? '접기' : '펼쳐보기'}
                  </AccordionTrigger>
                )}
              </div>
              <AccordionContent>
                <div className='font-inter mt-2 rounded-md p-4 leading-normal shadow-inner'>
                  <div className='mb-1 flex items-center justify-between'>
                    <p className='text-[1.375rem] font-bold text-gray-800'>
                      {title}
                    </p>
                    {status === '답변대기' && (
                      <Button
                        variant='default'
                        className='h-[2.4375rem] w-[7.5rem] rounded-full bg-main px-4 py-1 text-[1rem] font-extrabold text-white'
                        onClick={() => navigate('/admin/inquiry/answerInput')}
                      >
                        답변하기
                      </Button>
                    )}
                  </div>
                  <p className='mb-2 text-left text-[1rem] font-medium text-gray-400'>
                    작성자 · {time} · {category}
                  </p>
                  <p className='text-left text-[1.125rem] font-medium leading-normal text-gray-700'>
                    문의 내용에 대한 상세 설명이 여기에 표시됩니다.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}

export default InquiryList;
