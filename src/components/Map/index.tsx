import { useMap } from '@/hooks/map-context';
import { useEffect } from 'react';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import BottomFloatingBox from '../Direction/BottomFloatingBox';
import Nav from '../Nav/Nav';
import { MyLocation } from './MyLocation';
import useGetBranchList from '@/hooks/query/customer/useGetBranchList';

export function Map() {
  const {
    mapRef,
    mapFocusOnly,
    selectedBranchId,
    setBranchList,
    setFocus,
    getCurrentLatitude,
    getCurrentLongitude,
  } = useMap();

  const { data: branches, isLoading } = useGetBranchList({
    latitude: getCurrentLatitude(),
    longitude: getCurrentLongitude(),
  });

  useEffect(() => {
    if (isLoading || !branches) {
      return;
    }
    setBranchList(branches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
