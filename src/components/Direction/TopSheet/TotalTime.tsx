import { useMap } from '@/hooks/map-context';

export default function TotalTime() {
  const { routesType, routesPedestrainResponse, routesAutomobileResponse } =
    useMap();

  const { totalTime } = (routesType === 'automobile'
    ? routesAutomobileResponse
    : routesPedestrainResponse) || { totalTime: 0 };

  return (
    <div className='flex items-end gap-3'>
      <div>소요시간</div>
      <div className='flex items-end'>
        {totalTime > 3600 ? (
          <div className='flex items-end gap-[0.3rem]'>
            <div className='flex items-end gap-[0.1rem]'>
              <div className='text-3xl font-bold'>
                {(totalTime / 3600).toFixed(0)}
              </div>
              <div>시간</div>
            </div>
            <div className='flex items-end gap-[0.1rem]'>
              <div className='text-3xl font-bold'>
                {((totalTime % 3600) / 60).toFixed(0)}
              </div>
              <div>분</div>
            </div>
          </div>
        ) : (
          <>
            <div className='text-3xl font-bold'>
              {(totalTime / 60).toFixed(0)}
            </div>
            <div>분</div>
          </>
        )}
      </div>
    </div>
  );
}
