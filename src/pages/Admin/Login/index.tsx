import React, { useState } from 'react';
import hanaLogo from '../../../assets/icons/hanaLogo.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('로그인 시도');
  };

  return (
    <div className='flex items-center justify-center bg-[#FFFFFF]'>
      <div className='shadow-[0_4px_20px_0_rgba(0,0,0,0.1) mx-auto flex h-full w-[40%] flex-col rounded-xl border-4 bg-[#008485] bg-opacity-5 p-[3.4375rem]'>
        <div className='flex items-center justify-center'>
          <img
            src={hanaLogo}
            alt='하나은행 로고'
            className='h-[4.375rem] w-[19.125rem]'
          />
        </div>

        <div className='mt-[5.9375rem] flex flex-col items-center'>
          <form onSubmit={handleLogin} className='w-full space-y-[4.9375rem]'>
            <div>
              <label
                htmlFor='user-id'
                className='block text-start text-[1.25rem] font-bold text-[#464646]'
              >
                아이디
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-start text-[1.25rem] font-bold text-[#464646]'
              >
                비밀번호
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
            <button
              type='submit'
              className='shadow-[0_4px_10px_0_rgba(0,0,0,0.1) h-[10%] w-full rounded-[1.25rem] bg-[#008485] p-[1.3125rem] text-[1.25rem] text-white hover:bg-[#00858570]'
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
