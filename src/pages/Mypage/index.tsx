import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { MYPAGECONSTANTS } from '@/constants/mypage';
import useGetCustomerDetail from '@/hooks/query/customer/useGetCustomerDetail';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../Register/Call';
import { toast } from '@/hooks/use-toast';
import { AccessTokenNames } from '@/api/Api';
import { CUSTOMER_ROUTE } from '@/constants/route';

function Mypage() {
  const navigate = useNavigate();

  const { data: customerDetail, isLoading } = useGetCustomerDetail();

  if (isLoading || !customerDetail) {
    return (
      <div className='z-10 mx-auto mt-16 flex w-[90%] items-center'>
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full bg-[#F2F2F2]' />
          <Skeleton className='h-4 w-[80%] bg-[#F2F2F2]' />
        </div>
      </div>
    );
  }

  const {
    name,
    authId: userId,
    phoneNum: phoneNumber,
    birth,
    callAmount,
    inquiryAmount,
    visitAmount,
  } = customerDetail;

  const infoItems = [
    { label: '아이디', value: userId },
    { label: '생년월일', value: birth },
    { label: '휴대폰 번호', value: phoneNumber },
  ];

  const receiptItems = [
    { label: '방문 예약', value: visitAmount },
    { label: '전화 문의', value: callAmount },
    { label: '1:1 문의', value: inquiryAmount },
  ];

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleBottomMenuClick = (path: string) => {
    if (path === '/logout') {
      showToast(toast, '로그아웃되었습니다.');
      const tokenName: AccessTokenNames = 'customerAccessToken';
      localStorage.removeItem(tokenName);
      navigate(CUSTOMER_ROUTE.signin);
      window.location.reload();
    } else handleNavigate(path);
  };

  return (
    <>
      <div className='mx-auto flex h-screen w-[100%] flex-col overflow-visible'>
        <div className='flex h-full w-full flex-col space-y-[1.5rem] overflow-auto scrollbar-hide'>
          <div className='mx-auto flex w-full flex-col'>
            <div className='relative'>
              <div className='mt-[-1px] h-[15rem] rounded-b-lg bg-[#469387]' />
              <div className='absolute left-[5%] top-[5.5rem] w-[90%]'>
                <div className='flex items-center'>
                  <span className='ml-4 flex items-center'>
                    <span className='text-[1.5rem] font-bold text-white'>
                      {name}
                    </span>
                    <span className='text-base text-white'>님</span>
                  </span>
                </div>

                <div className='mt-[1.5rem] flex h-[10.125rem] items-center justify-center rounded-lg bg-white shadow-lg'>
                  <div className='flex w-[84%] flex-col'>
                    {infoItems.map((item, index) => (
                      <span key={index} className='my-2 flex justify-between'>
                        <span className='text-[0.9375rem] font-light text-[#191919]'>
                          {item.label}
                        </span>
                        <span className='text-[0.9375rem] font-light text-[#666666]'>
                          {item.value}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='mx-auto mt-4 w-[90%]'>
              <div className='mb-[1.13rem] mt-[5.69rem] text-left'>
                <span className='text-left text-[1.125rem] font-bold'>
                  {MYPAGECONSTANTS.status.name}
                </span>
              </div>
              <ul className='mb-[1.06rem] flex min-h-[7.1875rem] w-full items-center justify-evenly gap-[2.12rem] rounded-lg border-[2px] border-[#f2f2f2] bg-[#fafafa]'>
                {receiptItems.map(({ label, value }, index) => (
                  <li key={index} className='flex flex-col gap-[0.75rem]'>
                    <span className='text-[1rem] font-light text-[#999999]'>
                      {label}
                    </span>
                    <span
                      className='cursor-pointer text-[1.5rem] font-bold hover:underline'
                      onClick={() => {
                        const url =
                          '/reservation/' +
                          (label === '방문 예약'
                            ? 'visit'
                            : label === '전화 문의'
                              ? 'call'
                              : label === '1:1 문의'
                                ? 'inquiry'
                                : '404');
                        handleNavigate(url);
                      }}
                    >
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className='mx-auto w-[90%]' />

            <div className='w-full bg-white'>
              <div className='mx-auto mt-4 w-[90%]'>
                <div className='mt-[2rem] flex flex-col items-start gap-3'>
                  {MYPAGECONSTANTS.menu.map(({ name, path }, idx) => (
                    <React.Fragment key={idx}>
                      <div className='flex w-full items-center justify-between'>
                        <span className='font-light'>{name}</span>
                        <span
                          onClick={() => navigate(path)}
                          className='cursor-pointer'
                        ></span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <Separator className='mx-auto my-5 w-full' />

                <div className='mt-auto flex flex-col items-end'>
                  {MYPAGECONSTANTS.bottomMenu.map((item, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleBottomMenuClick(item.path)}
                      className='mt-3 cursor-pointer'
                    >
                      <span className='text-[0.875rem] font-light'>
                        {item.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pb-[80px] min-[435px]:pb-[85px] min-[800px]:pb-[90px]'></div>
      </div>
    </>
  );
}

export default Mypage;
