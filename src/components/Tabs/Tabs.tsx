import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  tabLocation: 'visit' | 'call';
  leftValue: 'visit' | 'call';
  leftName: string;
  rightValue: 'visit' | 'call';
  rightName: string;
  onChange: (value: 'visit' | 'call') => void;
};

function Tabs({
  tabLocation,
  leftValue,
  leftName,
  rightValue,
  rightName,
  onChange,
}: Props) {
  const [activeTab, setActiveTab] = useState(tabLocation);
  const navigate = useNavigate();

  const ChangeTab = (newTab: 'visit' | 'call') => {
    setActiveTab(newTab);
    navigate(`/reservation/${newTab}`);
  };
  return (
    <div className='mb-[1.75rem] flex flex-col items-center'>
      <div className='mt-[2.1875rem] flex w-full justify-center'>
        <button
          className={`text-center transition-all duration-300 ease-in-out ${
            activeTab === leftValue
              ? 'scale-105 font-bold text-[#2b2b2b]'
              : 'scale-100 text-[#a6a6a6]'
          } mx-auto lg:ml-[6.8rem]`}
          onClick={() => {
            ChangeTab(leftValue);
            onChange(leftValue);
          }}
        >
          {leftName}
        </button>
        <button
          className={`text-center transition-all duration-300 ease-in-out ${
            activeTab === rightValue
              ? 'scale-105 font-bold text-[#2b2b2b]'
              : 'scale-100 text-[#a6a6a6]'
          } mx-auto`}
          onClick={() => {
            ChangeTab(rightValue);
            onChange(rightValue);
          }}
        >
          {rightName}
        </button>
      </div>

      <div className='relative mt-[0.5rem] h-[.125rem] w-full bg-[#d9d9d9]'>
        {/* 선택된 탭의 검은색 밑줄 */}
        <div
          className={`absolute h-[.2rem] transform rounded-xl bg-[#464646] transition-all duration-700 ease-in-out ${
            activeTab === leftValue
              ? 'left-0 w-1/2 scale-x-100'
              : 'right-0 w-1/2 scale-x-100'
          }`}
          style={{
            transformOrigin:
              activeTab === leftValue ? 'left center' : 'right center',
          }}
        />
      </div>
    </div>
  );
}

export default Tabs;
