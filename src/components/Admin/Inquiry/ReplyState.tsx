import { InquiryStatus } from '@/types/enum';
import React from 'react';

function ReplyState({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: InquiryStatus;
  setActiveTab: React.Dispatch<React.SetStateAction<InquiryStatus>>;
  tabs: InquiryStatus[];
}) {
  return (
    <div className='relative flex h-[3rem] w-full rounded-full bg-white p-1 shadow-[0_2px_15px_0_rgba(0,0,0,0.15)]'>
      {/* 이동하는 배경 */}
      <div
        className={`absolute -left-0.5 -top-2 h-[3.9375rem] w-[53%] rounded-full bg-gray-600 transition-transform duration-300 ease-in-out ${
          tabs.indexOf(activeTab) === 1 ? 'translate-x-[92%]' : 'translate-x-0'
        }`}
      ></div>

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`font-inter relative z-10 flex-1 py-2 text-xl font-bold leading-normal transition-colors duration-300 ${
            activeTab === tab ? 'text-white' : 'text-gray-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ReplyState;
