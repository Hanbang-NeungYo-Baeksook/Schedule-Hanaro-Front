import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../Register/Call';
import notFound from '@/assets/images/notFound.png';

export default function NotFound() {
  const navigate = useNavigate();
  const { toast } = useToast();

  showToast(toast, '메인페이지로 돌아갑니다.');
  setTimeout(() => navigate('/'), 1000);

  return (
    <div className='App'>
      <div className='mx-auto flex justify-center pt-10'>
        <img src={notFound} alt='NotFound' width={400}></img>
      </div>
    </div>
  );
}
