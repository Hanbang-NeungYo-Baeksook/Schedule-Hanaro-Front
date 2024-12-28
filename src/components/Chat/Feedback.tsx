import usePostCall from '@/hooks/query/customer/usePostCall';
import usePostInquiry from '@/hooks/query/customer/usePostInquiry';
import usePostVisit from '@/hooks/query/customer/usePostVisit';
import {
  postCallRequestAtom,
  postInquiryRequestAtom,
  postVisitRequestAtom,
} from '@/stores';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Modalbutton from '../Direction/Modal';

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
        <Modalbutton
          buttonTitle='아니오, 부족해요'
          buttonVariant='ghost'
          buttonSize='w-1/2'
          modalTitle='상담 접수'
          modalDescription1='더 나은 답변 제공을 위해 상담이 접수됩니다.'
          modalDescription2=''
          modalButtonTitle='확인'
          onClick={handleNegativeFeedback}
        ></Modalbutton>

        <Modalbutton
          buttonTitle='네, 도움이 되었어요'
          buttonVariant='default'
          buttonSize='w-1/2'
          modalTitle='AI 답변 완료'
          modalDescription1='AI 답변을 통해 도움이 되었다면'
          modalDescription2='상담이 접수되지 않습니다.'
          modalButtonTitle='확인'
          onClick={handlePositiveFeedback}
        ></Modalbutton>
      </div>
    </div>
  );
};

export default Feedback;
