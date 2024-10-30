import { useState } from 'react';
import { ChangeToggle } from '../Reservation/ChangeToggle';
import Tabs from '../Tabs/Tabs';
import { ReactComponent as DropButton } from '@/assets/icons/reservation/minidown.svg';

function ReservationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('전화 상담 내역');
  const [activeTab, setActiveTab] = useState<'visit' | 'call'>('visit');

  const toggleCallList = () => {
    setIsOpen(!isOpen);
  };

  const selectTab = (tabName: string) => {
    setSelectedTab(tabName);
    setIsOpen(false);
  };

  const changeActiveTab = (tabName: 'visit' | 'call') => {
    setActiveTab(tabName);
  };

  const [selectedStatus, setSelectedStatus] = useState('대기 중인 상담'); // 상담 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const toggleInquiryList = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status); // 상태 변경
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <header className='top_header fixed top-0 z-50 bg-white pt-[0.75rem]'>
      <div className='top_header_page text-[1.25rem] font-bold text-[#2b2b2b]'>
        예약내역
      </div>
      <div className='w-[90%] justify-self-center'>
        <Tabs
          leftValue='visit'
          leftName='방문 상담'
          rightValue='call'
          rightName='전화 / 1:1 상담'
          onChange={changeActiveTab}
        />
        {activeTab === 'visit' ? (
          <div className='mb-3 text-left text-2xl font-bold text-black'>
            방문 상담
          </div>
        ) : selectedTab === '전화 상담 내역' ? (
          <ChangeToggle
            isOpen={isOpen}
            onToggle={toggleCallList}
            selectedTab={selectedTab}
            onSelect={selectTab}
          />
        ) : (
          <div className='flex items-center justify-between'>
            <ChangeToggle
              isOpen={isOpen}
              onToggle={toggleInquiryList}
              selectedTab={selectedTab}
              onSelect={selectTab}
            />
            <div className='relative pb-[1.25rem]'>
              <button
                className={`justify-between] flex items-center ${
                  selectedStatus === '대기 중인 상담'
                    ? 'text-[#666666]'
                    : 'text-[#666666]'
                } text-right text-[1rem] font-bold`}
                onClick={toggleDropdown}
              >
                {selectedStatus}
                <div className='pl-[0.25rem]'>
                  <DropButton />
                </div>
              </button>
              {isDropdownOpen && (
                <ul className='absolute right-0 z-50 w-[10rem]'>
                  {selectedStatus === '대기 중인 상담' ? (
                    <li
                      className='cursor-pointer whitespace-nowrap pl-[3.1rem] text-[#b3b3b3]'
                      onClick={() => handleStatusChange('완료된 상담')}
                    >
                      완료된 상담
                    </li>
                  ) : (
                    <li
                      className='cursor-pointer whitespace-nowrap pl-[2.1rem] text-[#b3b3b3]'
                      onClick={() => handleStatusChange('대기 중인 상담')}
                    >
                      대기 중인 상담
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default ReservationHeader;
