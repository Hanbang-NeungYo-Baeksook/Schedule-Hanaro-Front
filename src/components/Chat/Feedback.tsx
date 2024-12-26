import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import usePostCall from '@/hooks/query/customer/usePostCall';
import usePostInquiry from '@/hooks/query/customer/usePostInquiry';
import usePostVisit from '@/hooks/query/customer/usePostVisit';
import { useAtomValue } from 'jotai';
import {
  postCallRequestAtom,
  postInquiryRequestAtom,
  postVisitRequestAtom,
} from '@/stores';

const Feedback = ({ resigterType }: { resigterType: string }) => {
  const { mutate: postCall } = usePostCall();
  const { mutate: postInquiry } = usePostInquiry();
  const { mutate: postVisit } = usePostVisit();

  const postCallRequest = useAtomValue(postCallRequestAtom);
  const postInquiryRequest = useAtomValue(postInquiryRequestAtom);
  const postVisitRequest = useAtomValue(postVisitRequestAtom);

  const navigate = useNavigate();

  const handlePositiveFeedback = () => {
    navigate('/');
  };

  const handleNegativeFeedback = () => {
    if (resigterType === 'else') {
      navigate(`/register/selection?type=${resigterType}&from=ai`);
    } else if (resigterType === 'call' && postCallRequest) {
      postCall(postCallRequest);
    } else if (resigterType === 'inquiry' && postInquiryRequest) {
      postInquiry(postInquiryRequest);
    } else if (resigterType === 'visit' && postVisitRequest) {
      postVisit(postVisitRequest);
    }
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
