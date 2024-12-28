import loadingBasic from '@/assets/images/LoadingBasic.gif';

export default function LoadingBasic() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-6 bg-gray-50'>
      <img
        className='h-48 w-48 object-contain'
        src={loadingBasic}
        alt='Loading'
      />

      <div className='text-center text-2xl font-extrabold text-gray-800'>
        잠시만 기다려주세요.
      </div>
    </div>
  );
}
