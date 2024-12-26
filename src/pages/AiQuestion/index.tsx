import Nav from '@/components/Nav/Nav';
import { Button } from '@/components/ui/button';
import { contentAtom, isLoadingAtom } from '@/stores';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowAi from '@/assets/icons/arrowAI.svg';
import usePostRecommendList from '@/hooks/query/customer/usePostRecommendList';
import Loading from '@/components/Chat/Loading';
import Header from '@/components/Header/Header';

const recommendedQuestions = [
  '인터넷에서 신용대출을 신청했는데 언제 결과 확인이 가능합니까?',
  '통장비밀번호를 잊어버렸어요',
  '적금 상품 추천을 받을 수 있나요?',
  '미성년자도 펀드를 가입할 수 있나요?',
];

export default function AiQuestion() {
  const { mutate: postRecommendList } = usePostRecommendList();

  const navigate = useNavigate();

  const [, setContent] = useAtom(contentAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const [isExpanded] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (textAreaRef.current) {
      const inputValue = textAreaRef.current.value.trim();
      if (!inputValue) {
        return;
      }
      setContent(inputValue);
      setIsLoading(true);
      postRecommendList({
        query: textAreaRef.current?.value ?? '',
      });
      navigate('/ai/answer/else');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between bg-white text-lg'>
        <Header title={'별꽁이에게 문의하기'} />
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
                      if (textAreaRef.current) {
                        textAreaRef.current.value = question;
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
                ref={textAreaRef}
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
      </div>
      <Nav />
    </>
  );
}
