import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Feedback = ({ resigterType }: { resigterType: string }) => {
  const navigate = useNavigate();

  const handlePositiveFeedback = () => {
    navigate('/');
  };

  const handleNegativeFeedback = () => {
    navigate(`/register/type/${resigterType}`);
  };

  return (
    <div className='flex flex-col items-center gap-[1rem]'>
      <p className='text-lg font-bold'>
        AI가 생성해드린 맞춤 답변이 도움이 되셨나요?
      </p>
      <div className='flex w-[80%] gap-4'>
        <Button type='button' variant='ghost' onClick={handleNegativeFeedback}>
          아니요, 부족해요
        </Button>
        <Button
          type='button'
          variant='default'
          onClick={handlePositiveFeedback}
        >
          네, 도움이 되었어요
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
