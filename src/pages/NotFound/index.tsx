import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../Register/Call';
import notFound from '@/assets/images/notFound.png';

export default function NotFound() {
  const navigate = useNavigate();
  const { toast } = useToast();

  showToast(toast, '메인페이지로 돌아갑니다.');
  //   setTimeout(() => navigate('/'), 1000);

  return (
    <div className='mx-auto mt-10'>
      <img src={notFound} alt='NotFound' width={500}></img>
      <div className='text-6xl'>잘못된 경로입니다</div>
    </div>
  );
}
