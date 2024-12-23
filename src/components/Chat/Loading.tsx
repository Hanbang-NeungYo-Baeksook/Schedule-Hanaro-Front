import loadingGif from '@/assets/images/loading.gif';

export default function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center pb-[15rem]'>
      <img
        className='h-48 w-48 object-contain'
        src={loadingGif}
        alt='Loading'
      />
      <div className='text-center text-2xl font-bold'>
        AI가 추천 답변을 생성하고 있어요!
      </div>
    </div>
  );
}
