import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ActiveTab } from '@/types/inquiry';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReplyState from '../Inquiry/ReplyState';
import { CallProps } from './WaitingList';

function CallInfoBox({
  selectedIdx,
  setSelectedIdx,
  toggleOpen,
}: CallProps & { toggleOpen: () => void }) {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<ActiveTab>('문의정보');
  const [activeCategory, setActiveCategory] = useState('전화문의');

  return (
    <div className='flex h-full flex-col rounded-[20px] bg-white px-4 pb-8 pt-6'>
      <div className='pb-5 pt-3'>
        <ReplyState activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === '문의정보' && (
        <div className='flex flex-grow flex-col'>
          <div className='relative mt-10 flex flex-grow flex-col justify-between rounded-[50px] border-[1px] border-border'>
            <div className='absolute left-[38%] top-[-20px] flex items-center gap-3 bg-white px-2'>
              <span className='text-4xl font-bold'>{selectedIdx}</span>
              <Badge>예금</Badge>
            </div>
            <div className='flex min-h-80 flex-grow flex-col overflow-auto rounded p-4'>
              <div className='my-3 flex items-center justify-start gap-2'>
                <Badge className='py-1' variant='lightSolid'>
                  # 비밀번호
                </Badge>
                <Badge className='py-1' variant='lightSolid'>
                  # 인증서
                </Badge>
              </div>
              <div className='text-[1.125rem] text-lightGrey'>
                내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </div>
          </div>
          {location.pathname === '/admin/online' && (
            <div className='mt-4 flex justify-end gap-3'>
              {selectedIdx !== 123 && (
                <Button
                  className='w-fit rounded-3xl bg-[#777777] px-4 py-2 hover:bg-[#666]'
                  onClick={() => setSelectedIdx(123)}
                >
                  현재 고객으로 이동
                </Button>
              )}
              {selectedIdx === 123 && (
                <Button
                  className='w-fit rounded-3xl bg-[#777777] px-4 py-2 text-white hover:bg-[#666]'
                  onClick={toggleOpen}
                >
                  상담 내용 입력하기
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === '고객정보' && (
        <div>
          <div className='my-4 flex items-center gap-3'>
            <h3 className='whitespace-nowrap text-lg font-bold text-[#666666]'>
              기본 정보
            </h3>
            <div className='h-[2px] w-full bg-[#666666]'></div>
          </div>
          <ul className='mb-6 space-y-3 px-3 text-gray-600'>
            <li className='flex items-center justify-between'>
              <span>고객명</span>
              <span>강능요</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>이메일</span>
              <span>asdf@naver.com</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>전화번호</span>
              <span>010-1111-2222</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>생년월일</span>
              <span>1970년 08월 11일</span>
            </li>
          </ul>
          <div className='my-5 flex items-center gap-3'>
            <h3 className='whitespace-nowrap text-lg font-bold text-[#666666]'>
              상담 이력
            </h3>
            <div className='h-[2px] w-full bg-[#666666]'></div>
          </div>
          <div className='w-full border-b-[2px] border-border pb-[1px]'>
            <span
              className={cn(
                'cursor-pointer px-3 py-1',
                activeCategory === '전화문의'
                  ? 'border-b-[2px] border-lightText text-lightText'
                  : 'border-none text-border'
              )}
              onClick={() => setActiveCategory('전화문의')}
            >
              전화 문의
            </span>
            <span
              className={cn(
                'cursor-pointer px-3 py-1',
                activeCategory === '1:1문의'
                  ? 'border-b-[2px] border-lightText text-lightText'
                  : 'border-none text-border'
              )}
              onClick={() => setActiveCategory('1:1문의')}
            >
              1:1 문의
            </span>
          </div>
          <div className='rounded bg-white'>
            <div className='flex w-full items-center justify-between border-b-[1px] border-border px-3 py-5'>
              <div className='space-x-2'>
                <span>1</span>
                <span>안녕하세요. 문의드립니다...</span>
                <Badge variant='outline'>예금</Badge>
              </div>
              <span className='text-[0.75rem]'>상세보기</span>
            </div>
            <div className='flex w-full items-center justify-between border-b-[1px] border-border px-3 py-5'>
              <div className='space-x-2'>
                <span>2</span>
                <span>안녕하세요. 문의드립니다...</span>
                <Badge variant='outline'>대출</Badge>
              </div>
              <span className='text-[0.75rem]'>상세보기</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CallInfoBox;
