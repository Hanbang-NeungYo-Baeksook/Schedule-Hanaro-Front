import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from '@/assets/images/mainLogo.svg';
import usePostLoginQuery from '@/hooks/query/customer/usePostLogin';
import { toast } from '@/hooks/use-toast';

function SignInPage() {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkButtonState = () => {
      const id = idRef.current?.value || '';
      const password = passwordRef.current?.value || '';
      setIsButtonDisabled(!(id && password));
    };

    const idInput = idRef.current;
    const passwordInput = passwordRef.current;

    idInput?.addEventListener('input', checkButtonState);
    passwordInput?.addEventListener('input', checkButtonState);

    return () => {
      idInput?.removeEventListener('input', checkButtonState);
      passwordInput?.removeEventListener('input', checkButtonState);
    };
  }, []);

  const { mutate: signin } = usePostLoginQuery();

  const handleLogin = async () => {
    console.log('Handle Login!!');

    if (!idRef.current?.value || !passwordRef.current?.value) {
      toast({
        title: '로그인 실패',
        description: '아이디와 비밀번호를 모두 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    signin({
      authId: idRef.current.value,
      password: passwordRef.current.value,
    });
  };

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
            ref={idRef}
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
          onClick={() => handleLogin()}
        >
          로그인
        </button>

        <div
          className='mt-[1.5rem] cursor-pointer hover:underline'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </div>
      </div>
    </div>
  );
}
export default SignInPage;
