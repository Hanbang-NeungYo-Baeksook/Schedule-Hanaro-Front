import { SELECT_ITEMS } from '@/constants';
import { SearchConditions } from '@/pages/Admin';
import { Category } from '@/types/enum';
import { Search } from 'lucide-react';
import { useState } from 'react';
import arrowDown from '../../../assets/icons/arrow_down.svg';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { DatePicker } from '../Call/DatePicker'; // 날짜 선택 컴포넌트

type SearchConditionSettingProps = {
  searchConditions: SearchConditions;
  onSearch: (conditions: SearchConditions) => void;
};

function SearchConditionSetting({
  searchConditions,
  onSearch,
}: SearchConditionSettingProps) {
  const [tmpFilterConditions, setTmpFilterConditions] =
    useState(searchConditions);

  const onInputChange = <K extends keyof SearchConditions>(
    field: K,
    value: SearchConditions[K]
  ) => {
    setTmpFilterConditions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 초기화
  const handleReset = () => {
    setTmpFilterConditions({
      page: 1,
      startedAt: undefined,
      endedAt: undefined,
      category: undefined,
      keyword: undefined,
    });
  };

  return (
    <div className='mx-auto w-full max-w-[1300px] rounded-lg bg-white p-6 shadow-custom'>
      {/* 상단 제목 영역 */}
      <div className='mb-6 flex justify-start'>
        <h2 className='text-xl font-extrabold text-black'>검색 조건 설정</h2>
      </div>

      <div className='mb-6 grid grid-cols-3 items-start gap-6'>
        <div className='flex flex-col items-start'>
          <label className='mb-1 self-start text-base font-semibold text-black'>
            기간
          </label>
          <div className='flex items-center space-x-2'>
            <DatePicker
              selected={
                tmpFilterConditions.startedAt
                  ? new Date(tmpFilterConditions.startedAt)
                  : undefined
              }
              onChange={(date) =>
                onInputChange('startedAt', date?.toISOString())
              } // string으로 저장
              maxDate={new Date()}
              placeholderText='시작일'
            />
            <span className='text-gray-500'>~</span>
            <DatePicker
              selected={
                tmpFilterConditions.endedAt
                  ? new Date(tmpFilterConditions.endedAt)
                  : undefined
              }
              onChange={(date) => onInputChange('endedAt', date?.toISOString())} // string으로 저장
              minDate={
                tmpFilterConditions.startedAt
                  ? new Date(tmpFilterConditions.startedAt)
                  : undefined
              }
              maxDate={new Date()}
              placeholderText='종료일'
            />
          </div>
        </div>

        <div className='flex flex-col pl-7'>
          <label className='mb-1 self-start text-base font-semibold text-black'>
            카테고리
          </label>
          <div
            className='relative flex-shrink-0'
            style={{ width: '14rem', height: '2.5rem' }}
          >
            <Select
              value={tmpFilterConditions.category}
              onValueChange={(value) =>
                onInputChange('category', value as Category)
              }
            >
              <SelectTrigger className='relative h-[3rem] w-[14rem] rounded-full border-none bg-white pl-3 text-left text-base text-gray-500 shadow-md'>
                <span className='ml-1'>
                  <SelectValue placeholder='전체' />
                </span>
                <span className='absolute right-3 top-1/2 -translate-y-1/2'>
                  <img src={arrowDown} className='ml-0 mr-2 inline-block' />
                </span>
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

        <div className='flex flex-col items-start'>
          <label className='mb-1 self-start text-base font-semibold text-black'>
            검색어
          </label>
          <div
            className='relative mb-4 flex items-center'
            style={{ width: '22rem', height: '3rem' }}
          >
            <Search className='absolute left-3' size={18} />
            <Input
              type='text'
              value={tmpFilterConditions.keyword}
              onChange={(e) => onInputChange('keyword', e.target.value)}
              className='placeholer:text-base h-full w-full rounded-full border-none bg-white pl-10 pr-4 text-base shadow-md placeholder:text-gray-500 focus:outline-none'
            />
          </div>

          <div className='flex w-full justify-end space-x-4'>
            <Button
              variant='outline'
              onClick={handleReset}
              className='rounded-full border-[1px] border-lightText bg-white px-3 py-1 text-[1rem] font-bold text-gray-600 hover:bg-gray-100'
            >
              초기화
            </Button>
            <Button
              variant='default'
              onClick={() => onSearch(tmpFilterConditions)}
              className='rounded-full bg-lightText px-3 py-1 text-[1rem] font-bold text-white hover:bg-gray-700'
            >
              검색
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchConditionSetting;
