import { MYPAGECONSTANTS } from '@/constants/mypage';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  const name = '김예나';
  const userId = 'isad';
  const phoneNumber = '010-1234-1234';
  const email = 'likesun2000@naver.com';
  const infoItems = [
    { label: '아이디', value: userId },
    { label: '이메일', value: email },
    { label: '휴대폰 번호', value: phoneNumber },
  ];
  const receiptItems = [
    { label: '방문 예약', value: 1 },
    { label: '전화 문의', value: 2 },
    { label: '1:1 문의', value: 3 },
  ];
  const navigate = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleBottomMenuClick = (path: string) => {
    if (path === '/logout') {
      console.log('로그아웃');
    } else handleNavigate(path);
  };

  return (
    <div className='m-auto flex h-[100dvh] flex-col'>
      <div className='relative'>
        <div className='mt-[-1px] h-[15rem] rounded-b-lg bg-[#469387]' />
        <div className='absolute left-[5%] top-[5.5rem] w-[90%]'>
          <div className='flex items-center'>
            {/* <img
              src={room}
              width='3.75rem'
              height='3.75rem'
              className='rounded-full'
            /> */}
            <span className='ml-4 flex items-center'>
              <span className='text-[1.5rem] font-bold text-white'>{name}</span>
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
              <span className='text-[1.5rem] font-bold'>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='min-h-[0.75rem] bg-[#ededed]' />

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

          <div className='mt-auto flex flex-col items-end'>
            {MYPAGECONSTANTS.bottomMenu.map((item, idx) => (
              <span
                key={idx}
                onClick={() => handleBottomMenuClick(item.path)}
                className='mt-3'
              >
                <span className='text-[0.875rem] font-light'>{item.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
