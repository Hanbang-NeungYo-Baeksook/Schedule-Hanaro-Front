import { useMap } from '@/hooks/map-context';
import { BRANCH_MOCK } from '@/mock/branch_mock';
import { useEffect } from 'react';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import BottomFloatingBox from '../Direction/BottomFloatingBox';
import Nav from '../Nav/Nav';
import { MyLocation } from './MyLocation';

export function Map() {
  // Test용 위치 추가 및 기존 코드 삭제
  const branchList = [...BRANCH_MOCK];

  const { mapRef, mapFocusOnly, selectedBranchId, setBranchList, setFocus } =
    useMap();

  useEffect(() => {
    setBranchList(branchList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='map' id='map' ref={mapRef} />
      {selectedBranchId ? (
        <div className='mx-auto w-full'>
          {/* TODO: 검색 화면 구현시 SearchInput 설정 */}
          {/* <SearchInput /> */}

          {!mapFocusOnly && (
            <>
              <div className='mx-auto flex w-full flex-col items-center'>
                <MyLocation onClick={() => setFocus()} type='direction' />
                <BottomFloatingBox type='map' branchId={selectedBranchId} />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {!mapFocusOnly && (
            <div className='mx-auto flex w-full flex-col items-center'>
              <MyLocation onClick={() => setFocus()} type='map' />
              <BottomSheet />
            </div>
          )}
          <Nav />
        </>
      )}
    </>
  );
}
