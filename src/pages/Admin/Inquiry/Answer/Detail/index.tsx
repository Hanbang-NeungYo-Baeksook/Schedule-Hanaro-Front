import { useNavigate } from 'react-router-dom';

export function AnswerDetail() {
  const navigate = useNavigate();
  return (
    <div className='mx-auto h-full w-[83%]'>
      <button
        className='mb-[1rem] flex items-center text-gray-600 hover:text-gray-800'
        onClick={() => navigate(-1)}
      >
        <span className='mr-1 text-[0.825rem]'>&lt;</span>{' '}
        <span className='text-[0.825rem] font-bold text-[#464646]'>
          뒤로가기
        </span>
      </button>
      <div className='mx-auto h-[85%] rounded-[1.875rem] bg-white p-[1.5rem] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]'>
        <div className='overflow-wrap break-word text-left text-[1.125rem] font-bold text-[#464646]'>
          안녕하세요 문의드리려고 합니다 문의드려도 될까요?
        </div>
        <div className='mt-[0.75rem] flex items-start'>
          <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>
            이규호
          </span>
          <span className='mx-1 text-[0.65rem] text-[#b3b3b3]'>·</span>
          <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>
            12분전
          </span>
          <span className='mx-1 text-[0.65rem] text-[#b3b3b3]'>·</span>
          <span className='text-[0.7rem] font-medium text-[#b3b3b3]'>예금</span>
        </div>

        <div className='overflow-wrap break-word mb-[1rem] mt-[1rem] text-left text-[0.675rem] font-medium text-[#666666]'>
          안녕하세요 좀 궁금한게 있는데 어떤게 궁금한지는 잘 모르겠어서 생각 좀
          해보고 다시 문의드릴게요 감사합니다. 반갑습니다 수고하세요 안녕하세요
          다시 왔어요 궁금한게 생각나기는 했는데 정확히 어떤건지는 잘 모르겠어서
          다시 갔다와야 할 줄 알았는데 다시 생각이 났어요 예금은 어떻게 하는
          건가요? 하나 추천해주세요~
        </div>
        <hr />
        <div className='mb-[0.5rem] mt-[0.75rem] text-left text-[0.9rem] font-bold text-[#464646]'>
          답변
        </div>
        <div className='overflow-wrap break-word mb-[1rem] mt-[1rem] text-left text-[0.675rem] font-medium text-[#666666]'>
          반갑습니다 고객님 *^^* 예금 정보가 궁금하셨군요~ 예금은 어쩌구~ 돈을
          저저구~ 예금 상품 추천해드릴게요~~ 답변이 되셨으면 좋아요 부탁드립니다
          ~!
        </div>
      </div>
    </div>
  );
}
