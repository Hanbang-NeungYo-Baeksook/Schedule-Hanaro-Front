import { ReactComponent as DownVector } from '@/assets/icons/DownVector.svg';
import { ReactComponent as UpVector } from '@/assets/icons/UpVector.svg';
import Feedback from '@/components/Chat/Feedback';
import Loading from '@/components/Chat/Loading';
import Header from '@/components/Header/Header';
import { Badge } from '@/components/ui/badge';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import {
  contentAtom,
  isLoadingAtom,
  recommendListAtom,
  tagListAtom,
} from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AiAnswer() {
  const { registerType } = useParams();

  const { mutate: postRecommendList } = usePostRecommendList();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [, setIsEditing] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between bg-white text-lg'>
      <Header title={'별꽁이에게 문의하기'} />
      <div className='mx-auto flex min-h-screen w-[90%] flex-col justify-between gap-[2rem] pb-[7rem] pt-[7rem]'>
        <div className='flex flex-col items-center gap-[1rem] px-[1rem]'>
          {content.trim() || isExpanded ? (
            <div
              className={`relative w-full rounded-[1.25rem] border-[.1875rem] border-main bg-white p-[1rem] text-center text-[1rem] font-normal shadow-[0_0_17px_0_rgba(0,132,133,0.25)] transition-all duration-300 ${
                // 수정한부분 2024.12.01
                isExpanded ? 'h-auto' : 'cursor-pointer overflow-hidden'
              }`}
              onClick={!isExpanded ? handleToggleExpand : undefined} // 클릭 시 확장
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
                  className='px-[1.2rem] py-[0.2rem] text-[.875rem] font-bold'
                >
                  #{badge}
                </Badge>
              ))}
            </div>
          </div>

          {recommendList.map((answer, index) => (
            <div key={index} className='w-full'>
              <div
                className='relative z-20 flex w-full cursor-pointer items-start rounded-[.9375rem] bg-[#3FA5A6] p-4'
                onClick={() =>
                  setDropdownIndex(dropdownIndex === index ? null : index)
                }
              >
                <div className='pl-[.25rem] pr-[.625rem] font-bold text-white'>
                  Q
                </div>
                <div className='text-white'>{answer.query}</div>
                {dropdownIndex === index ? (
                  <UpVector className='"h-[1.5rem] ml-auto w-[1.5rem] py-[0.5rem] pr-[0.5rem]' />
                ) : (
                  <DownVector className='"h-[1.5rem] ml-auto w-[1.5rem] py-[0.5rem] pr-[0.5rem]' />
                )}
              </div>
              {dropdownIndex === index && (
                <div className='relative z-10 -mt-4 w-full rounded-[.9375rem] border-[.125rem] border-[#d9d9d9] bg-white px-4 pb-3 pt-6'>
                  <p className='text-left text-[1rem] font-bold text-[#464646]'>
                    {answer.response}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <Feedback resigterType={registerType ?? 'else'} />
      </div>
    </div>
  );
}
