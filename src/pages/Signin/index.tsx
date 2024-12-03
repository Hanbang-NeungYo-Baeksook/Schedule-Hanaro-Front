import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from '@/assets/images/mainLogo.svg';

function SigninPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkButtonState = () => {
      const email = emailRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      setIsButtonDisabled(!(email && password));
    };

    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    emailInput?.addEventListener('input', checkButtonState);
    passwordInput?.addEventListener('input', checkButtonState);

    return () => {
      emailInput?.removeEventListener('input', checkButtonState);
      passwordInput?.removeEventListener('input', checkButtonState);
    };
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white'>
      <div className='mb-8'>
        <img src={mainLogo} className='h-20' />
      </div>

      <div className='w-full max-w-xs'>
        <div className='mb-4'>
          <label className='mb-2 block text-left text-[1.25rem] font-bold text-[#464646]'>
            아이디
          </label>
          <input
            ref={emailRef}
            placeholder='hanaro@hanaro.com'
            className='w-full border-b border-gray-300 px-[0.75rem] py-[0.5rem] leading-tight text-[#464646] focus:border-[#666666] focus:outline-none'
          />
        </div>

        <div className='mb-6'>
          <label
            className='mb-2 block text-left text-[1.25rem] font-bold text-[#464646]'
            htmlFor='password'
          >
            비밀번호
          </label>
          <input
            ref={passwordRef}
            className='w-full border-b border-gray-300 px-[0.75rem] py-[0.5rem] leading-tight text-[#464646] focus:border-[#666666] focus:outline-none'
          />
        </div>

        <button
          disabled={isButtonDisabled}
          className={`w-full rounded-[.625rem] px-[0.75rem] py-[0.75rem] ${isButtonDisabled ? 'bg-[#eaeaea]' : 'bg-[#008485] bg-opacity-80 hover:bg-[#008485]'} font-bold text-[#ffffff]`}
        >
          로그인
        </button>

        <button
          className='mt-[1.5rem] w-full rounded-[.625rem] bg-[#008485] bg-opacity-80 px-[0.75rem] py-[0.75rem] font-bold text-[#ffffff] hover:bg-[#008485]'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
export default SigninPage;
