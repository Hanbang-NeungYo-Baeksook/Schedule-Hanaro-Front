import { ReactComponent as DownVector } from '@/assets/icons/DownVector.svg';
import Feedback from '@/components/Chat/Feedback';
import Loading from '@/components/Chat/Loading';
import Header from '@/components/Header/Header';
import { Badge } from '@/components/ui/badge';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import { cn } from '@/lib/utils';
import {
  contentAtom,
  isLoadingAtom,
  recommendListAtom,
  tagListAtom,
} from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export function AiAnswer() {
  const { registerType } = useParams();

  const { mutate: postRecommendList } = usePostRecommendList();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [, setIsEditing] = useState(false);

  const [content, setContent] = useAtom(contentAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const recommendList = useAtomValue(recommendListAtom);
  const tagList = useAtomValue(tagListAtom);

  const MAX_LENGTH = 65; // 축약 시 최대 글자 수

  const handleSend = () => {
    setContent(textAreaRef.current?.value ?? '');
    postRecommendList({
      query: textAreaRef.current?.value ?? '',
    });
    handleToggleExpand();
    setIsLoading(true);
  };

  // 확장/축약 상태 전환
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsEditing(false);
  };

  // 글자 축약 처리
  const truncatedContent =
    content.length > MAX_LENGTH
      ? content.slice(0, MAX_LENGTH) + '...' // 문자열 길이를 기준으로 잘라내기
      : content;

  // 높이 애니메이션 적용
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLParagraphElement[] | null>([]);
  const [heights, setHeights] = useState<number[] | undefined>([]);

  const calculateHeights = () => {
    const newHeights = contentRefs.current?.map((ref) =>
      ref ? ref.scrollHeight + 50 : 0
    );
    setHeights(newHeights);
  };

  useEffect(() => {
    calculateHeights();
  }, [recommendList]);

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const links: Record<number, string> = {
    411: 'https://www.hanabank.com/fund/index.do',
    414: 'https://www.hanabank.com/pension/index.do?contentUrl=/pension/retirement/wppns100_01i.do?_menuNo=99006#//HanaBank',
    416: 'https://www.kebhana.com/cont/mall/mall08/mall0802/mall080204/1420271_115200.jsp?_menuNo=98786',
    418: 'https://www.kebhana.com/cont/mall/mall08/mall0802/mall080204/1431602_115200.jsp?_menuNo=98786',
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between bg-white text-lg'>
      <Header title={'별꽁이에게 문의하기'} />
      <div className='mx-auto flex min-h-screen w-[90%] flex-col justify-between gap-[2rem] pb-[7rem] pt-[7rem]'>
        <div className='flex flex-col items-center gap-[1rem] px-[1rem]'>
          {content.trim() ? (
            <div
              className={cn(
                'relative w-full overflow-hidden rounded-[1.25rem] border-[.1875rem] border-main bg-white p-[1rem] text-center text-[1rem] font-normal shadow-[0_0_17px_0_rgba(0,132,133,0.25)] transition-all duration-300'
              )}
              style={{
                maxHeight: isExpanded ? '500px' : '5rem',
                transition: 'max-height 0.3s ease-in-out',
              }}
              onClick={!isExpanded ? handleToggleExpand : undefined}
            >
              {!isExpanded ? (
                <span>&quot;{truncatedContent}&quot;</span>
              ) : (
                <div>
                  <textarea
                    className='w-full resize-none border-none bg-white p-[1rem] text-[1rem] font-normal focus:outline-none'
                    ref={textAreaRef}
                    defaultValue={content}
                    rows={5}
                    autoFocus
                  />
                  <div className='mt-2 flex justify-end gap-2'>
                    <button
                      className='rounded-[3.125rem] bg-[#d9d9d9] px-[1.25rem] py-[.25rem] text-[.875rem] text-[#464646] drop-shadow'
                      onClick={() => {
                        setIsExpanded(false); // 축약 상태로 복귀
                      }}
                    >
                      취소
                    </button>
                    <button
                      className='rounded-[3.125rem] bg-[#464646] px-[1.25rem] py-[.25rem] text-[.875rem] text-white drop-shadow'
                      onClick={handleSend}
                    >
                      완료
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <div className='flex flex-col items-center gap-[1rem]'>
            <p className='text-[1.2rem] font-bold text-[#2b2b2b]'>
              원하시는 문의와 유사한 답변들을 보여드릴게요
            </p>
            <div className='flex flex-wrap justify-center gap-[1rem]'>
              {tagList.map((badge, index) => (
                <Badge
                  key={index}
                  variant='lightSolid'
                  className='bg-[linear-gradient(259deg,_rgba(187,_187,_187,_0.15)_11.47%,_rgba(0,_132,_133,_0.15)_88.87%)] px-[1.2rem] py-[0.2rem] text-[.875rem] font-bold'
                >
                  #{badge}
                </Badge>
              ))}
            </div>
          </div>

          {recommendList.map((answer, index) => (
            <div key={index} className='w-full'>
              {/* 제목 */}
              <div
                className={cn(
                  'relative z-20 flex w-full cursor-pointer items-center justify-between rounded-[.9375rem] p-4 transition-all duration-300',
                  dropdownIndex === index ? 'bg-[#338587]' : 'bg-[#3FA5A6]'
                )}
                onClick={() => toggleDropdown(index)}
              >
                <div className='flex w-[90%] items-center gap-2'>
                  <div className='pl-[.25rem] pr-[.625rem] font-bold text-white'>
                    Q
                  </div>
                  <div className='text-left text-white'>{answer.query}</div>
                </div>
                <div className={`flex w-[5%] items-center`}>
                  <span
                    className={`ml-auto h-[1.5rem] w-[1.5rem] py-[0.5rem] pr-[0.5rem] transition-transform duration-300 ${
                      dropdownIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <DownVector />
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  'relative z-10 flex w-full flex-col items-start justify-center overflow-hidden rounded-[.9375rem] border-[.125rem] border-[#d9d9d9] bg-white px-4 transition-all duration-300'
                )}
                style={{
                  height:
                    dropdownIndex === index
                      ? `${heights ? heights[index] : 0}px`
                      : '0',
                  opacity: dropdownIndex === index ? 1 : 0,
                }}
              >
                <Badge className='mt-4 rounded-[10px] border-[1px] border-[#DADFF3] bg-[#F2F4FB] px-4 py-1 text-[.875rem] font-bold text-[#0022AC]'>
                  유사도{' '}
                  <span className='ml-1 text-[1rem]'>{answer.similarity}</span>%
                </Badge>
                <p
                  ref={(el) => {
                    if (el) {
                      contentRefs.current![index] = el;
                    }
                  }}
                  className='whitespace-pre-line px-2 py-3 text-left text-[1rem] font-bold text-[#464646]'
                >
                  <div>
                    {links[answer.recommend_id] && (
                      <a
                        className='text-[1.25rem] font-bold text-main'
                        href={links[answer.recommend_id]}
                      >
                        👉 상품 바로가기 👈
                      </a>
                    )}
                  </div>
                  <span>{answer.response}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <Feedback resigterType={registerType ?? 'else'} />
      </div>
    </div>
  );
}
