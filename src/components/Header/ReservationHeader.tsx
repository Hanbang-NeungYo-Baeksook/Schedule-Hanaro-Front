import { InquiryStatus } from '@/api/customer/inquires';
import { ReactComponent as DropButton } from '@/assets/icons/reservation/minidown.svg';
import Header from '@/components/Header/Header';
import { cn } from '@/lib/utils';
import { callStatusAtom, inquiryStatusAtom } from '@/stores';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ChangeToggle } from '../Reservation/ChangeToggle';
import Tabs from '../Tabs/Tabs';
import { Status } from '@/api/customer/calls';

type Props = {
  tabLocation: 'visit' | 'call';
  toggleTitle: '전화 상담 내역' | '1:1 상담 내역';
};

function ReservationHeader({ tabLocation, toggleTitle }: Props) {
  const [callStatus, setCallStatusAtom] = useAtom(callStatusAtom);
  const [inquiryStatus, setInquiryStatusAtom] = useAtom(inquiryStatusAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(toggleTitle);
  const [activeTab, setActiveTab] = useState<'visit' | 'call'>(tabLocation);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const convertStatusToMessage = (status: Status | InquiryStatus) => {
    if (status == 'PENDING') {
      return '대기 중인 상담';
    } else {
      return '완료된 상담';
    }
  };

  const [selectedStatus, setSelectedStatus] = useState(
    toggleTitle === '전화 상담 내역'
      ? convertStatusToMessage(callStatus)
      : convertStatusToMessage(inquiryStatus)
  ); // 상담 상태

  const toggleCallList = () => {
    setIsOpen(!isOpen);
  };

  const selectTab = (tabName: '전화 상담 내역' | '1:1 상담 내역') => {
    setSelectedTab(tabName);
    setIsOpen(false);
  };

  const changeActiveTab = (tabName: 'visit' | 'call') => {
    setActiveTab(tabName);
  };

  const toggleInquiryList = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기
  };

  const handleStatusChange = (status: '대기 중인 상담' | '완료된 상담') => {
    setSelectedStatus(status); // 상태 변경
    setCallStatusAtom(callStatusConverter(status));
    setInquiryStatusAtom(inquiryStatusConverter(status));
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  const callStatusConverter: (
    str: '대기 중인 상담' | '완료된 상담'
  ) => Status = (str) => {
    return str === '완료된 상담' ? 'COMPLETE' : 'PENDING';
  };

  const inquiryStatusConverter: (
    str: '대기 중인 상담' | '완료된 상담'
  ) => InquiryStatus = (str) => {
    return str === '완료된 상담' ? 'REGISTRATIONCOMPLETE' : 'PENDING';
  };

  return (
    <>
      <div className='absolute z-10'>
        <Header title='예약내역' />
      </div>
      <div className='relative mx-auto w-[90%] justify-self-center pt-[3.5rem]'>
        <Tabs
          tabLocation={tabLocation}
          leftValue='visit'
          leftName='방문 상담'
          rightValue='call'
          rightName='전화 / 1:1 상담'
          onChange={changeActiveTab}
        />
        {activeTab === 'visit' ? (
          <div className='mb-1 text-left text-2xl font-bold text-black'>
            방문 상담
          </div>
        ) : selectedTab === '전화 상담 내역' ? (
          <div className='flex items-center justify-between'>
            <ChangeToggle
              isOpen={isOpen}
              onToggle={toggleCallList}
              selectedTab={selectedTab}
              onSelect={selectTab}
            />
            <div className='relative pb-[1.25rem]'>
              <button
                className={`flex items-center justify-between ${
                  selectedStatus === '대기 중인 상담'
                    ? 'text-[#666666]'
                    : 'text-[#666666]'
                } text-right text-[1rem] font-bold`}
                onClick={toggleDropdown}
              >
                {selectedStatus}
                <div
                  className={cn(
                    'transform pl-[0.25rem] transition-transform duration-300',
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  )}
                >
                  <DropButton />
                </div>
              </button>
              {isDropdownOpen && (
                <ul
                  className={cn(
                    'absolute right-0 z-50 w-[10rem] transition-all duration-300 ease-in-out',
                    isDropdownOpen ? 'animate-slideDown' : 'animate-slideUp'
                  )}
                >
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
                className={`flex items-center justify-between ${
                  selectedStatus === '대기 중인 상담'
                    ? 'text-[#666666]'
                    : 'text-[#666666]'
                } text-right text-[1rem] font-bold`}
                onClick={toggleDropdown}
              >
                {selectedStatus}
                <div
                  className={cn(
                    'transform pl-[0.25rem] transition-transform duration-300',
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  )}
                >
                  <DropButton />
                </div>
              </button>
              {isDropdownOpen && (
                <ul
                  className={cn(
                    'absolute right-0 z-50 w-[10rem] transition-all duration-300 ease-in-out',
                    isDropdownOpen ? 'animate-slideDown' : 'animate-slideUp'
                  )}
                >
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
    </>
  );
}

export default ReservationHeader;
