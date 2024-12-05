import { Map } from '@/components';
import { MapProvider } from '@/hooks/map-context';
import { useRef } from 'react';

export function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <MapProvider mapRef={mapRef}>
      <div className='map relative'>
        <Map />
      </div>
    </MapProvider>
  );
}
