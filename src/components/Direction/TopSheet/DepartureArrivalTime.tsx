import { useMap } from '@/hooks/map-context';
import { useEffect, useState } from 'react';

export default function DepartureArrivalTime() {
  const { routesType, routesPedestrainResponse, routesAutomobileResponse } =
    useMap();

  const departureTime = new Date();
  const [arrivalTime, setArrivalTime] = useState<Date>(new Date());

  useEffect(() => {
    if (!routesPedestrainResponse || !routesAutomobileResponse) return;

    const { totalTime } =
      routesType === 'automobile'
        ? routesAutomobileResponse
        : routesPedestrainResponse;
    const tmpTime = new Date(departureTime);
    tmpTime.setSeconds(
      departureTime.getSeconds() + +(totalTime / 60).toFixed(0) * 60
    );
    setArrivalTime(tmpTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routesPedestrainResponse, routesAutomobileResponse, routesType]);

  return (
    <div className='flex flex-col justify-between font-bold max-[550px]:text-sm'>
      <div>
        {departureTime
          ? `${departureTime.getHours().toString().padStart(2, '0')} : ${departureTime.getMinutes().toString().padStart(2, '0')}`
          : `00:00`}
      </div>
      <div>
        {arrivalTime
          ? `${arrivalTime.getHours().toString().padStart(2, '0')} : ${arrivalTime.getMinutes().toString().padStart(2, '0')}`
          : `00:00`}
      </div>
    </div>
  );
}
