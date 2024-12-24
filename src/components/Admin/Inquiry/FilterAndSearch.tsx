import { SELECT_ITEMS } from '@/constants';
import { Category } from '@/types/enum';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
// import { DatePicker } from '../Call/DatePicker'; // 수정된 DatePicker 컴포넌트
// import { DatePicker } from '../Call/DatePicker'; // 수정된 DatePicker 컴포넌트

function FilterAndSearch({
  setActiveCategory,
  setSearchQuery,
}: {
  setActiveCategory: (category: Category) => void;
  setSearchQuery: (query: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  // const [startDate, setStartDate] = useState<Date | undefined>(undefined); // 시작일
  // const [endDate, setEndDate] = useState<Date | undefined>(undefined); // 종료일

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setActiveCategory(category); // 상위 컴포넌트에 카테고리 변경 전달
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    setSearchQuery(query); // 상위 컴포넌트로 검색어 전달
  };

  return (
    <div className='flex items-center space-x-5'>
      {/* 기간 선택 영역 */}
      {/*
      <div className='flex flex-col items-start'>
        <div className='flex items-center space-x-2'>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date && date > endDate) {
                setEndDate(undefined); // 종료일 초기화
              }
            }}
            maxDate={new Date()} // 오늘까지 선택 가능
            placeholderText='시작일'
          />
          <span className='text-gray-500'>~</span>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            minDate={startDate || new Date()} // 시작일 포함 이후만 선택 가능
            maxDate={new Date()} // 오늘까지 선택 가능
            placeholderText='종료일'
          />
        </div>
      </div>*/}

      {/* 카테고리 선택 영역 */}
      <div className='flex flex-col items-start'>
        <div
          className='relative flex-shrink-0'
          style={{ width: '8rem', height: '2.0625rem' }}
        >
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='h-full w-full rounded-full border-none bg-white px-4 py-2 text-[0.875rem] font-normal text-gray-600 shadow-md'>
              <SelectValue placeholder='전체' />
            </SelectTrigger>
            <SelectContent>
              {SELECT_ITEMS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 검색 입력 필드 영역 */}
      <div className='flex flex-col items-start'>
        <div
          className='relative flex flex-shrink-0 items-center'
          style={{ width: '11.9375rem', height: '2.0625rem' }}
        >
          <Search className='absolute left-3 text-black' size={18} />
          <Input
            type='text'
            value={searchInput}
            onChange={handleSearchChange} // 검색어 상태 변경
            placeholder='검색'
            className='h-full w-full rounded-full bg-white pl-10 pr-4 shadow-md focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
