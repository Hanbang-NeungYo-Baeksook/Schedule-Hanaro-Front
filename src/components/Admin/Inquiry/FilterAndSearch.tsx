import { SELECT_ITEMS } from '@/constants';
import { useDebounce } from '@/hooks/timer-hooks';
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

function FilterAndSearch({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  useDebounce(
    () => {
      setSearchQuery(tempSearchQuery);
    },
    300,
    [tempSearchQuery]
  );

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchQuery(e.target.value);
  };

  return (
    <div className='flex items-center space-x-5'>
      {/* 카테고리 선택 영역 */}
      <div className='flex flex-col items-start'>
        <div
          className='relative flex-shrink-0'
          style={{ width: '8rem', height: '2.0625rem' }}
        >
          <Select value={activeCategory} onValueChange={handleCategoryChange}>
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
            value={tempSearchQuery}
            onChange={handleSearchChange}
            placeholder='검색'
            className='h-full w-full rounded-full bg-white pl-10 pr-4 shadow-md focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
