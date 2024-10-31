import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AnswerInput() {
  // const { toast } = useToast();
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answer.trim()) {
      alert('답변을 입력하세요');
      // toast({
      //   title: '답변을 입력하세요.',
      // });
      return;
    }

    console.log('답변:', answer);
    setAnswer('');
  };

  const handleCancel = () => {
    return navigate('/admin/inquiry');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto h-[90%] w-[83%] rounded-[1.875rem] bg-white p-[1.5rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'
    >
      <div className='overflow-wrap break-word text-left text-[18px] font-bold text-[#464646]'>
        안녕하세요 문의드리려고 합니다 문의드려도 될까요?
      </div>
      <div className='mt-[0.75rem] flex items-start'>
        <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>이규호</span>
        <span className='mx-1 text-[0.65rem] text-[#b3b3b3]'>·</span>
        <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>12분전</span>
        <span className='mx-1 text-[0.65rem] text-[#b3b3b3]'>·</span>
        <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>예금</span>
      </div>

      <div className='overflow-wrap break-word mb-[1rem] mt-[1rem] flex flex-wrap text-left text-[0.675rem] font-medium text-[#666666]'>
        안녕하세요 좀 궁금한게 있는데 어떤게 궁금한지는 잘 모르겠어서 생각 좀
        해보고 다시 문의드릴게요 감사합니다. 반갑습니다 수고하세요 안녕하세요
        다시 왔어요 궁금한게 생각나기는 했는데 정확히 어떤건지는 잘 모르겠어서
        다시 갔다와야 할 줄 알았는데 다시 생각이 났어요 예금은 어떻게 하는
        건가요? 하나 추천해주세요~
      </div>
      <hr />
      <div className='mb-[0.5rem] mt-[0.75rem] text-left text-[0.9rem] font-bold text-[#464646]'>
        답변 입력
      </div>
      <Textarea
        className='h-[55%] w-full resize-none rounded-[1.875rem] border border-[#d9d9d9] p-[1rem]'
        placeholder='답변을 입력하세요...'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        aria-label='답변 입력'
      />
      <div className='mt-[1rem] flex justify-end'>
        <Button
          className='inline-flex h-[2.5rem] w-[6.5rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-white px-[3.8125rem] py-[0.625rem] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] hover:bg-[#F8F8F8]'
          onClick={handleCancel}
          type='button'
        >
          <div className="font-['Inter'] text-[1rem] font-bold text-[#464646]">
            취소
          </div>
        </Button>
        <Button
          type='submit'
          className='ml-[1rem] inline-flex h-[2.5rem] w-[6.5rem] items-center justify-center gap-[0.625rem] rounded-[1.25rem] bg-[#464646] px-[3.8125rem] py-[0.625rem] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] hover:bg-[#343434]'
        >
          <div className="font-['Inter'] text-[1rem] font-bold text-white">
            등록
          </div>
        </Button>
      </div>
    </form>
  );
}
