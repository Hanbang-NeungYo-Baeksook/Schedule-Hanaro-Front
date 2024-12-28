import { ReactComponent as StarGgonge } from '@/assets/icons/StarGgonge.svg';
import { ReactComponent as HanaAvengers } from '@/assets/images/hanaAvengers.svg';
import Map from '@/assets/images/map.png';
import LoadingBasic from '@/components/Loading';
import { Toaster } from '@/components/ui/toaster';
import useGetCustomerDetail from '@/hooks/query/customer/useGetCustomerDetail';
import { useNavigate } from 'react-router-dom';
import MyCard from './MyCard';

export function MainPage() {
  const navigate = useNavigate();
  const { data: customer, isLoading } = useGetCustomerDetail();

  if (isLoading || !customer) {
    return <LoadingBasic />;
  }

  return (
    <>
      <div className='z-1 flex h-screen flex-col justify-start overflow-y-auto bg-[#DCEFEA] text-text scrollbar-hide'>
        <div className='flex w-full flex-col'>
          <div className='relative mx-auto flex w-[90%] flex-col py-20 pt-10'>
            <div className='z-10 mx-auto flex w-full flex-col items-start'>
              <div className='absoulte text-[2.3rem] font-[1000]'>
                반갑습니다
              </div>
              <div className='text-[3rem] font-bold'>{customer.name}님!</div>
              <HanaAvengers className='absolute bottom-[-3rem] right-0 z-10 w-[85%]' />
            </div>
          </div>
          <div className='z-[1] flex h-fit w-full flex-col rounded-t-[1.2rem] bg-white'>
            <div className='mx-auto flex w-[90%] flex-col gap-[3rem] pb-6'>
              <div className='flex flex-col gap-[2rem]'>
                <div className='mt-[3rem] flex w-full flex-col justify-start gap-[1rem]'>
                  <div className='text-start text-[1.5rem] font-bold'>
                    별꽁이에게 질문하기
                  </div>
                  <div
                    className='relative flex h-[3.5rem] w-full cursor-pointer items-center gap-4 rounded-3xl border-[3px] border-main bg-white p-4 pr-12 shadow-[0_0_17px_0_rgba(0,132,133,0.25)] focus:outline-none'
                    onClick={() => navigate('/ai/question')}
                  >
                    <StarGgonge className='mb-1' />
                    <div className='text-[1.05rem] text-lightText'>
                      궁금한 내용을 입력하세요
                    </div>
                  </div>
                </div>

                <div className='flex w-full flex-col items-start gap-[1rem]'>
                  <div className='text-[1.5rem] font-bold'>상담 예약</div>
                  <div className='flex w-full justify-between gap-4'>
                    <MyCard
                      title='전화상담'
                      contents={[
                        '전화 상담 예약을 통해',
                        '정해진 시간에 상담하세요',
                      ]}
                      onClick={() => navigate('/register/call')}
                    />
                    <MyCard
                      title='1:1 상담'
                      contents={[
                        '1:1 상담을 통해',
                        '간편하게 상담을 시작해보세요',
                      ]}
                      onClick={() => navigate('/register/inquiry')}
                    />
                  </div>
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
            </div>
          </div>
        </div>
        <div className='bg-white pb-[100px]'></div>
        <div className='navbar fixed bottom-0 z-[0] bg-white pb-[30rem] min-[1000px]:pb-[29rem]'></div>
      </div>
      <Toaster />
    </>
  );
}
