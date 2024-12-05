import Nav from '@/components/Nav/Nav';
import Loading from '@/assets/images/loading.gif';
import { useRef, useState } from 'react';
import Feedback from '@/components/Chat/Feedback';
import Header from '@/components/Header/Header';
import { Badge } from '@/components/ui/badge';
import { ReactComponent as DownVector } from '@/assets/icons/DownVector.svg';
import { ReactComponent as UpVector } from '@/assets/icons/UpVector.svg';
import { Button } from '@/components/ui/button';

const recommendedQuestions = [
  '통장은 어떤 기준으로 선택하나요?',
  '추천 예금 상품을 알려주세요',
  '적금 상품 추천을 받을 수 있나요?',
  '비밀번호를 잃어버렸어요',
];

const ChatPage = () => {
  const [answers, setAnswers] = useState<
    { question: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputContent, setInputContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setIsEditing] = useState(false);
  const [backupContent, setBackupContent] = useState('');
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [badges] = useState<string[]>(['예금', '추천', '대학생']);

  const MAX_LENGTH = 65; // 축약 시 최대 글자 수

  const handleSend = () => {
    if (textareaRef.current) {
      const inputValue = textareaRef.current.value.trim();
      if (!inputValue) {
        return;
      }
      setIsLoading(true);
      setAnswers([]);
      setTimeout(() => {
        setAnswers([
          {
            question: '대학생을 위한 통장이 있나요?',
            content:
              '만 35세 이하 대학생이나 사회초년생을 위한 수수료 면제 통장입니다. Young 하나 통장이 대표적입니다.',
          },
          {
            question: '직장인을 위한 통장이 있나요?',
            content:
              '직장인을 위한 혜택이 제공되는 통장으로, 월급 통장과 자동이체 혜택이 포함됩니다.',
          },
          {
            question: '사랑해요',
            content: '사랑해요라는 말은 언제 들어도 기분이 좋습니다!',
          },
        ]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const currentValue = textareaRef.current.value;
      setInputContent(currentValue);
    }
  };

  // 확장/축약 상태 전환
  const handleToggleExpand = () => {
    if (!isExpanded) {
      setBackupContent(inputContent);
    }
    setIsExpanded(!isExpanded);
    setIsEditing(false);
  };

  // 글자 축약 처리
  const truncatedContent =
    inputContent.length > MAX_LENGTH
      ? inputContent.slice(0, MAX_LENGTH) + '...' // 문자열 길이를 기준으로 잘라내기
      : inputContent;

  return (
    <div className='flex min-h-screen flex-col items-center justify-between bg-white text-lg'>
      <Header title={'AI 답변'} />
      {!isLoading && answers.length === 0 && (
        <div className='flex min-h-screen w-full flex-col items-center justify-center gap-[2rem] pb-[15rem] text-lg'>
          <div className='h-80 w-80'>
            <img
              src='/svg/santa.svg' // 산타 이미지
              className='h-full w-full object-contain'
              alt='Santa'
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
                className='w-full resize-none overflow-hidden rounded-3xl border-[.1875rem] border-main bg-white p-4 pr-12 shadow-[0_0_17px_0_rgba(0,132,133,0.25)] focus:outline-none'
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
                src='src/assets/icons/arrowAI.svg'
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

      {isLoading && (
        <div className='flex h-screen w-full flex-col items-center justify-center pb-[15rem]'>
          <img
            className='h-48 w-48 object-contain'
            src={Loading}
            alt='Loading'
          />
          <div className='text-center text-2xl font-bold'>
            AI가 추천 답변을 생성하고 있어요!
          </div>
        </div>
      )}
      {!isLoading && answers.length > 0 && (
        <div className='flex min-h-screen w-full flex-col justify-between gap-[2rem] pb-[7rem] pt-[7rem]'>
          <div className='flex flex-col items-center gap-[1rem] px-[1rem]'>
            {inputContent.trim() || isExpanded ? (
              <div
                className={`relative w-full rounded-[1.25rem] border-[.1875rem] border-main bg-white p-[1rem] text-left text-[1rem] font-normal shadow-[0_0_17px_0_rgba(0,132,133,0.25)] transition-all duration-300 ${
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
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                      rows={5}
                      autoFocus
                    />
                    <div className='mt-2 flex justify-end gap-2'>
                      <button
                        className='rounded-[3.125rem] bg-[#d9d9d9] px-[1.25rem] py-[.25rem] text-[.875rem] text-[#464646] drop-shadow'
                        onClick={() => {
                          setInputContent(backupContent); // 이전 상태로 복구
                          setIsExpanded(false); // 축약 상태로 복귀
                        }}
                      >
                        취소
                      </button>
                      <button
                        className='rounded-[3.125rem] bg-[#464646] px-[1.25rem] py-[.25rem] text-[.875rem] text-white drop-shadow'
                        onClick={() => {
                          setBackupContent(inputContent); // 변경된 내용 저장
                          setIsLoading(true); // 로딩 상태 시작
                          setTimeout(() => {
                            setIsLoading(false); // 로딩 상태 종료
                            setIsExpanded(false); // 축약 상태로 복귀
                          }, 2000); // 2초 후 로딩 종료
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
                {badges.map((badge, index) => (
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

            {answers.map((answer, index) => (
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
                  <div className='text-white'>{answer.question}</div>
                  {dropdownIndex === index ? (
                    <UpVector className='"h-[1.5rem] ml-auto w-[1.5rem] py-[0.5rem] pr-[0.5rem]' />
                  ) : (
                    <DownVector className='"h-[1.5rem] ml-auto w-[1.5rem] py-[0.5rem] pr-[0.5rem]' />
                  )}
                </div>
                {dropdownIndex === index && (
                  <div className='relative z-10 -mt-4 w-full rounded-[.9375rem] border-[.125rem] border-[#d9d9d9] bg-white px-4 pb-3 pt-6'>
                    <p className='text-[1rem] font-bold text-[#464646]'>
                      {answer.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Feedback />
        </div>
      )}
      <Nav />
    </div>
  );
};

export default ChatPage;
