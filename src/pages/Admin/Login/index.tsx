import React, { useState } from 'react';
import hanaLogo from '../../../assets/icons/hanaLogo.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !password) {
      toast({
        title: '로그인 실패',
        description: '아이디와 비밀번호를 모두 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axios.post('/api/login', { id, password });

      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('accountname', id);

      toast({
        title: '로그인 성공',
        description: `${id}님, 환영합니다!`,
        variant: 'default',
      });

      navigate('/admin/online');
    } catch (error: unknown) {
      console.error('로그인 오류:', error);
      toast({
        title: '로그인 실패',
        description: '아이디 또는 비밀번호가 올바르지 않습니다.',
        variant: 'destructive',
      });
    }
  };

  const isDisabled = !id || !password;

  return (
    <div className='flex items-center justify-center bg-[#FFFFFF]'>
      <div className='mx-auto flex h-full max-h-[60rem] min-h-[40rem] w-[40%] min-w-[40rem] max-w-[40rem] flex-col rounded-[1.25rem] bg-[#008485] bg-opacity-5 p-[3.4375rem] pb-[5rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
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
                id='id'
                type='text'
                value={id}
                onChange={(e) => setId(e.target.value)}
                className='mt-[0.25rem] w-full border-b-[.125rem] border-[#D9D9D9] bg-transparent p-[0.5rem] transition-colors duration-300 ease-in-out focus:border-[#008485] focus:outline-none focus:ring-0' // 애니메이션 추가
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
                className='mt-[0.25rem] w-full border-b-[.125rem] border-[#D9D9D9] bg-transparent p-[0.2rem] transition-colors duration-300 ease-in-out focus:border-[#008485] focus:outline-none focus:ring-0' // 애니메이션 추가
              />
            </div>
            <button
              type='submit'
              disabled={isDisabled}
              className={`w-full rounded-[1.25rem] p-[1rem] text-[1.25rem] font-bold text-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] ${isDisabled ? 'bg-[#D9D9D9]' : 'bg-[#008485] hover:bg-[#008585a9]'} `}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
