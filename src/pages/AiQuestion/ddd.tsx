import { ReactComponent as DownVector } from '@/assets/icons/DownVector.svg';
import { ReactComponent as UpVector } from '@/assets/icons/UpVector.svg';
import ArrowAi from '@/assets/icons/arrowAI.svg';
import Feedback from '@/components/Chat/Feedback';
import Loading from '@/components/Chat/Loading';
import Header from '@/components/Header/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import {
  contentAtom,
  isLoadingAtom,
  recommendListAtom,
  tagListAtom,
} from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const recommendedQuestions = [
  '통장 비밀번호는 숫자만 사용할 수 있나요?',
  '지방세 고지서를 모바일로 받기 위한 서비스 신청 절차는 어떻게 되나요?',
  '미성년자인 경우에도 펀드에 가입할 수 있는지, 가능하다면 절차나 필요한 조건이 무엇인지 궁금합니다',
  '인터넷으로 신용 대출 신청을 완료했는데, 결과를 확인할 수 있는 시점이 언제인지 알고 싶습니다.',
];

const ChatPageCopy = () => {
  const [recommendList, setRecommendList] = useAtom(recommendListAtom);
  const { registerType } = useParams();
  const tagList = useAtomValue(tagListAtom);
  const { mutate: postRecommendList } = usePostRecommendList();

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef2 = useRef<HTMLTextAreaElement>(null);
  const [inputContent, setInputContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setIsEditing] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const [, setContent] = useAtom(contentAtom);

  const MAX_LENGTH = 65; // 축약 시 최대 글자 수

  const handleSend = () => {
    if (textareaRef.current) {
      const inputValue = textareaRef.current.value.trim();
      if (!inputValue) {
        return;
      }
      setInputContent(inputValue);
      setContent(inputValue);
      setIsLoading(true);
      postRecommendList({ query: inputValue });
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // 확장/축약 상태 전환
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsEditing(false);
  };

  // 글자 축약 처리
  const truncatedContent =
    inputContent.length > MAX_LENGTH
      ? inputContent.slice(0, MAX_LENGTH) + '...' // 문자열 길이를 기준으로 잘라내기
      : inputContent;

  useEffect(() => {
    setRecommendList([]);
    setContent('');
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between bg-white text-lg'>
        <Header title={'별꽁이에게 문의하기'} />
        {!isLoading && recommendList.length === 0 && (
          <div className='flex min-h-screen w-full flex-col items-center justify-center gap-[2rem] text-lg'>
            <div className='h-80 w-80'>
              <object
                data='/svg/santa.svg' // 산타 이미지
                className='h-full w-full object-contain'
              />
            </div>
            <div className='flex flex-col text-center text-lg font-bold'>
              <span>예나님이 작성하신 문의 내용을 바탕으로</span>
              <span>상담 전, AI의 맞춤답변을 제공해드려요</span>
            </div>
            <div className='flex w-full flex-col items-center'>
              <div className='w-[80%] pb-[0.75rem]'>
                <div
                  className='flex space-x-4 overflow-x-auto px-4 scrollbar-hide'
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {recommendedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        if (textareaRef.current) {
                          textareaRef.current.value = question;
                          handleInput();
                          handleSend();
                          setIsLoading(true);
                        }
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
              <div className='relative w-[80%]'>
                <textarea
                  ref={textareaRef}
                  className='h-fit w-full resize-none overflow-hidden rounded-3xl border-[.1875rem] border-main bg-white p-4 pr-12 shadow-[0_0_17px_0_rgba(0,132,133,0.25)] focus:outline-none'
                  placeholder='질문 내용을 입력하세요'
                  onInput={handleInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                />
                <img
                  src={ArrowAi}
                  alt='Send'
                  className={`absolute right-4 h-7 w-7 cursor-pointer object-contain transition-all ${
                    isExpanded ? 'bottom-5' : 'bottom-3 -translate-y-1/2'
                  }`}
                  onClick={handleSend}
                />
              </div>
            </div>
          </div>
        )}

        {isLoading && <Loading />}

        {!isLoading && recommendList.length > 0 && (
          <div className='flex min-h-screen w-[90%] flex-col justify-between gap-[2rem] pb-[7rem] pt-[7rem]'>
            <div className='flex flex-col items-center gap-[1rem] px-[1rem]'>
              {inputContent.trim() || isExpanded ? (
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
                        ref={textareaRef2}
                        defaultValue={inputContent}
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
                          onClick={() => {
                            setInputContent(textareaRef2.current?.value ?? '');
                            postRecommendList({
                              query: textareaRef2.current?.value ?? '',
                            });
                            handleToggleExpand();
                            setIsLoading(true);
                          }}
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
                    <div className='relative z-10 -mt-4 flex w-full flex-col items-start justify-center space-y-3 rounded-[.9375rem] border-[.125rem] border-[#d9d9d9] bg-white px-4 pb-3 pt-6'>
                      <Badge className='rounded-[10px] border-[1px] border-[#DADFF3] bg-[#F2F4FB] text-[1rem] text-[#0022AC]'>
                        유사도 {answer.similarity}%
                      </Badge>
                      <p className='whitespace-pre-line text-left text-[1rem] font-bold text-[#464646]'>
                        {answer.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Feedback resigterType={registerType ?? 'call'} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPageCopy;