import { Button } from '@/components/ui/button';
import usePostCallMemo from '@/hooks/query/admin/usePostCallMemo';
import { useRef } from 'react';

type Params = {
  callId: number;
  toggleOpenCallMemo: () => void;
};

function CallMemoForm({ callId, toggleOpenCallMemo }: Params) {
  const { mutate: postMemo } = usePostCallMemo();
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const submitMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (callId === -1) {
      return;
    }

    const body = {
      content: memoRef?.current?.value ?? '',
    };
    postMemo({ callId, body });
    toggleOpenCallMemo();
  };

  return (
    <div className='w-full space-y-3 bg-[#F2F2F2] p-4'>
      <span className='font-bold text-lightText'>상담 내용</span>
      <form onSubmit={submitMemo} className='space-y-3'>
        <textarea
          ref={memoRef}
          className='min-h-40 w-full rounded-[30px] border-[2px] border-border bg-white px-5 py-3'
        />
        <div className='flex items-center justify-end gap-3'>
          <Button
            type='button'
            className='w-fit rounded-full bg-white px-10 hover:bg-[#F2F2F2]'
            variant='outline'
            onClick={toggleOpenCallMemo}
          >
            취소
          </Button>
          <Button
            type='submit'
            className='w-fit rounded-full bg-lightText px-10 hover:bg-[#202020]'
            variant='default'
          >
            등록
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CallMemoForm;
