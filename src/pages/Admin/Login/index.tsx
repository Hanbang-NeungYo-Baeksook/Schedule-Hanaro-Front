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

  return (
    <div className='my-auto flex items-center justify-center bg-[#FFFFFF]'>
      <div className='shadow-[0_4px_20px_0_rgba(0,0,0,0.1) mx-auto flex h-full w-[40%] flex-col rounded-xl border-4 bg-[#008485] bg-opacity-5 p-[3.4375rem] pb-[5rem]'>
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
                className='mt-1 w-full border-b-2 border-[#D9D9D9] bg-transparent p-2 focus:border-[#008485] focus:outline-none focus:ring-0'
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
                className='mt-1 w-full border-b-2 border-[#D9D9D9] bg-transparent p-2 focus:border-[#008485] focus:outline-none focus:ring-0'
              />
            </div>
            <button
              type='submit'
              className='shadow-[0_4px_10px_0_rgba(0,0,0,0.1) w-full rounded-[1.25rem] bg-[#008485] p-[1rem] text-[1.25rem] font-bold text-white hover:bg-[#008585a9]'
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
