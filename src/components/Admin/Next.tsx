import { Button } from '../ui/button';

export default function Next() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Button className='bg-main/80 inline-flex h-[4.5rem] w-[12rem] items-center justify-center gap-2 rounded-[30rem] px-[1.5rem] py-[1.5rem]'>
        <div className='text-[1.75rem] font-extrabold text-white'>다음으로</div>
        <div className='relative h-[1.5rem] w-[1.5rem]'></div>
      </Button>
    </div>
  );
}