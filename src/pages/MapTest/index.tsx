import { ReactComponent as HanaAvengers } from '@/assets/images/hanaAvengers.svg';
import Map from '@/assets/images/map.png';

import MyCard from '../Main/MyCard';
import { useNavigate } from 'react-router-dom';
import RecommendCard from '../Main/RecommendCard';

export function MapTestPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex h-screen flex-col justify-between overflow-y-auto bg-[#DCEFEA] scrollbar-hide'>
        <div className='flex w-full flex-col'>
          <div className='relative mx-auto flex w-[90%] flex-col py-20 pt-10'>
            <div className='mx-auto flex w-full flex-col items-start'>
              <div className='absoulte text-[2.3rem] font-[1000]'>
                반갑습니다
              </div>
              <div className='text-[2.5rem] font-bold'>예나님!</div>
              <HanaAvengers className='absolute bottom-[-3rem] right-0 z-10 w-[85%]' />
            </div>
          </div>
          <div className='flex h-full w-full flex-col rounded-t-[1.2rem] bg-white'>
            <div className='mx-auto flex w-[90%] flex-col gap-[2rem] pb-6'>
              <div className='mt-10 flex w-full flex-col items-start gap-[1rem]'>
                <div className='text-[1.5rem] font-bold'>상담 예약</div>
                <div className='flex w-full justify-between gap-4'>
                  <MyCard
                    title='전화상담'
                    contents='상담사를 통한 전화 상담 서비스'
                    onClick={() => navigate('/register/call')}
                  />
                  <MyCard
                    title='1:1 상담'
                    contents='1:1 게시판을 통한 상담 서비스'
                    onClick={() => navigate('/register/inquiry')}
                  />
                </div>
              </div>

              <div className='flex flex-col items-start gap-4 md:gap-[0.5rem]'>
                <div
                  className='w-full cursor-pointer'
                  onClick={() => navigate('/map')}
                >
                  <img src={Map} />
                </div>
              </div>

              <div className='flex flex-col items-start gap-2'>
                <div className='text-[1.5rem] font-bold'>
                  예나님을 위한 맞춤형 QnA
                </div>
                <div className='text-[1.0rem] text-[#666666]'>
                  최근 상담 중 AI 생성 답변을 보여드립니다.
                </div>

                <RecommendCard
                  title='Q'
                  content='대학생을 위한 통장이 있나요?'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white pb-[8rem]'></div>
      </div>
    </>
  );
}
