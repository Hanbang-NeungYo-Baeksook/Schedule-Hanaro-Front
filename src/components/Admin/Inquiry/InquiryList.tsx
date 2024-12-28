import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '@/types/enum';
import { AdminInquiryData } from '@/types/inquiry';
import { formatElapsedTime } from '@/utils/timeUtil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../../assets/icons/right_arrow.svg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import FilterAndSearch from './FilterAndSearch';

type InquiryListProps = {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  inquiries: AdminInquiryData[];
  totalItems?: number;
  currentPage?: number;
};

function InquiryList({
  activeCategory,
  setActiveCategory,
  inquiries,
  searchQuery,
  setSearchQuery,
  totalItems,
  // currentPage,
}: InquiryListProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!inquiries)
    return (
      <>
        <Skeleton />
      </>
    );

  const MIN_ID = Math.min(...inquiries.map(({ inquiry_num }) => inquiry_num));
  console.log(MIN_ID);
  const formattedInquiries = inquiries?.map(
    ({
      inquiry_id,
      inquiry_num,
      status,
      category,
      tags = [],
      content,
      created_at,
      customer_name,
    }) => {
      return {
        id: String(inquiry_id),
        inquiry_num,
        status,
        category: category,
        time: formatElapsedTime(created_at),
        content: content,
        name: name,
        tags: [...tags],
        customer_name,
      };
    }
  );

  return (
    <div className='font-inter mx-auto w-full rounded-lg border-gray-200 bg-white p-6 text-[1.25rem] font-bold leading-normal shadow-custom'>
      <div className='font-inter mb-0 flex items-center justify-between border-b pb-4 font-normal leading-normal'>
        <h2 className='space-x-1 text-[1.125rem] font-bold text-gray-800'>
          <span>총</span>
          <span className='text-[1.4rem] font-extrabold text-teal-600'>
            {totalItems}
          </span>
          <span>건</span>
        </h2>
        <FilterAndSearch
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} // 검색 상태 전달
        />
      </div>

      <Accordion type='single' collapsible>
        {formattedInquiries
          .sort((a, b) => a.inquiry_num - b.inquiry_num)
          .map(
            ({
              id,
              inquiry_num,
              status,
              category,
              tags,
              customer_name,
              time,
              content,
            }) => (
              <AccordionItem key={id} value={id}>
                <div className='font-inter flex items-center justify-between py-4 font-normal leading-normal'>
                  <div className='flex items-center space-x-2'>
                    <span className='ml-5 mr-5 font-medium text-gray-700'>
                      {inquiry_num}
                      <span className='text-[0.75rem]'>번</span>
                    </span>
                    <span className='pr-2 font-semibold text-gray-800'>
                      {content.length <= 15
                        ? content
                        : `${content.substring(0, 15)}...`}
                    </span>
                    <Badge
                      variant='lightSolid'
                      className={`font-inter h-[1.8rem] w-auto justify-center rounded-full px-4 py-0.5 text-[0.8rem] font-normal leading-normal ${
                        status === 'PENDING'
                          ? 'bg-teal-50 text-teal-600'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {category}
                    </Badge>
                  </div>
                  {status === 'REGISTRATIONCOMPLETE' ? (
                    <span
                      className='mr-6 flex cursor-pointer items-center pb-[1.05rem] pt-[1rem] text-sm font-medium text-black'
                      onClick={() => navigate(`/admin/online/inquiry/${id}`)}
                    >
                      상세보기
                      <img
                        src={rightArrow}
                        alt='Go'
                        className='ml-0 inline-block'
                      />
                    </span>
                  ) : (
                    <AccordionTrigger
                      className='mr-5 flex items-center text-[0.875rem] font-normal text-black'
                      onClick={() =>
                        setExpandedItem(expandedItem === id ? null : id)
                      }
                    >
                      {expandedItem === id ? '접기' : '펼쳐보기'}
                    </AccordionTrigger>
                  )}
                </div>
                <AccordionContent className='-mb-4 mt-0 bg-gray-50'>
                  <div className='relative mt-2 rounded-md border-t p-4'>
                    {/* 상단 영역 */}
                    <div className='mb-1 flex items-center justify-between'>
                      <p className='font-semibold text-gray-800'>
                        {Array.isArray(tags) &&
                          tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant='lightSolid'
                              className={`mr-2 h-[1.8rem] w-auto justify-center rounded-full bg-gray-500 px-3 py-0.5 text-sm font-medium text-white`}
                            >
                              {'#' + tag}
                            </Badge>
                          ))}
                      </p>

                      {status === 'PENDING' &&
                        (MIN_ID === inquiry_num ? (
                          <Button
                            variant='default'
                            className='font-inter h-[2.8rem] w-[9rem] rounded-full bg-main px-4 py-1 align-middle text-base font-extrabold text-white'
                            onClick={() =>
                              navigate('/admin/online/inquiry/register/' + id)
                            }
                          >
                            답변하기
                          </Button>
                        ) : (
                          <Button
                            variant='default'
                            className='font-inter h-[2.8rem] w-[9rem] rounded-full bg-gray-200 px-4 py-1 align-middle text-base font-extrabold text-gray-300'
                            disabled
                          >
                            답변하기
                          </Button>
                        ))}
                    </div>

                    {/* 본문 내용 */}
                    <p className='mt-2 text-left text-[1.1rem] font-medium leading-normal text-gray-700'>
                      {content}
                    </p>

                    {/* 하단 정보 (오른쪽 정렬) */}
                    <div className='absolute bottom-4 right-4 text-right text-[0.95rem] font-medium text-gray-400'>
                      {customer_name} · {time} · {category}
                    </div>
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
