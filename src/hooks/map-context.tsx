import {
  DEFAULT_ZOOM_LEVEL,
  INITIAL_LATITUDE,
  INITIAL_LONGITUDE,
  MAX_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
} from '@/constants';
import { TMap, TMapMarker, TMapPolyline } from '@/types';
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import {
  useReverseGeoLocation,
  useRoutesAutomobile,
  useRoutesPedestrain,
} from './useTmapQuery';
import { parseRoutesResponse } from './parseRoutesPedestrainResponse';
import getMyLocation from './useMyLocation';
import useMarker from './useMarker';
import { defaultMarkers, Markers } from '@/types/markers';
import { PolyLine } from '@/components/Map/Polyline';
import { Coords, defaultCoords } from '@/types/coords';
import { BranchInfo } from '@/types/branch';
import { Marker } from '@/components/Map/Marker';
import {
  defaultRoutesRequest,
  defaultRoutesResponse,
  RoutesAction,
  RoutesRequest,
  RoutesResponse,
} from '@/types/routesPedestrainData';

type MapContextProps = {
  mapRef: RefObject<HTMLDivElement> | null;
  mapFocusOnly: boolean;
  currentAddress: string;
  startAddress: string;
  setStartCoord: (latitude: number, longitude: number) => void;
  setEndCoord: (latitude: number, longitude: number) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (branchId: string | null) => void;
  setBranchList: (branchList: BranchInfo[]) => void;
  routesPedestrainResponse: RoutesResponse | null;
  routesAutomobileResponse: RoutesResponse | null;
  setFocus: (latitude: number, longitude: number) => void;
  routesType: 'pedestrain' | 'automobile';
  setRouteTypeToPedestrain: () => void;
  setRouteTypeToAutomobile: () => void;
};

const { Tmapv3 } = window;

const MapContext = createContext<MapContextProps>({
  mapRef: null,
  mapFocusOnly: false,
  currentAddress: '',
  startAddress: '',
  setStartCoord: () => {},
  setEndCoord: () => {},
  selectedBranchId: '',
  setSelectedBranchId: () => {},
  setBranchList: () => {},
  routesPedestrainResponse: null,
  routesAutomobileResponse: null,
  setFocus: () => {},
  routesType: 'pedestrain',
  setRouteTypeToPedestrain: () => {},
  setRouteTypeToAutomobile: () => {},
});

type MapProviderProps = {
  mapRef: RefObject<HTMLDivElement>;
};
// TODO: 선택 상태하나 만들고 그거 set되면 그 라인만 보이게
// Routes Pedstrain
const routesReducer = (
  data: RoutesRequest,
  { type, payload }: RoutesAction
) => {
  let routesRequest: RoutesRequest;
  switch (type) {
    case 'setStartCoord':
      routesRequest = { ...data, startCoord: payload };
      break;
    case 'setEndCoord':
      routesRequest = { ...data, endCoord: payload };
      break;
    case 'setPathPedestrain':
      routesRequest = { ...data, pathPedestrain: payload };
      break;
    case 'setPathAutomobile':
      routesRequest = { ...data, pathAutomobile: payload };
      break;
  }

  return routesRequest;
};

export const MapProvider = ({
  children,
  mapRef,
}: PropsWithChildren<MapProviderProps>) => {
  const [mapInstance, setMapInstance] = useState<TMap | null>(null);
  const [mapFocusOnly, setMapFocusOnly] = useState(false);
  const [coords, setCoords] = useState<Coords>(defaultCoords);
  const [markers, setMarkers] = useState<Markers>(defaultMarkers);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [branchList, setBranchList] = useState<BranchInfo[]>([]);
  const [routesData, dispatchRoutesData] = useReducer(
    routesReducer,
    defaultRoutesRequest
  );
  const [routesPedestrainResponse, setRoutesPedestrainResponse] =
    useState<RoutesResponse>(defaultRoutesResponse);
  const [routesAutomobileResponse, setRoutesAutomobileResponse] =
    useState<RoutesResponse>(defaultRoutesResponse);
  useState<TMapPolyline | null>(null);
  useState<TMapPolyline | null>(null);
  const [routesType, setRoutesType] = useState<'pedestrain' | 'automobile'>(
    'pedestrain'
  );

  // Map 초기 설정
  useLayoutEffect(() => {
    if (mapRef.current?.firstChild || mapInstance) {
      return;
    }

    const map = new Tmapv3.Map('map', {
      center: new Tmapv3.LatLng(INITIAL_LATITUDE, INITIAL_LONGITUDE),
      zoom: DEFAULT_ZOOM_LEVEL,
      zoomControl: false,
    });

    map.setZoomLimit(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL);
    setMapInstance(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef]);

  // Map 클릭 시 상하 시트 토글
  useEffect(() => {
    if (!mapInstance) {
      return;
    }
    mapInstance.on('Click', () => {
      console.log('Map Clicked!!!!');
      setMapFocusOnly((cur) => !cur);
    });
  }, [mapInstance, setMapFocusOnly]);

  // 현위치 주소 받아오기
  const { data: addressData } = useReverseGeoLocation({
    latitude: coords.currentCoord?.lat() || 0,
    longitude: coords.currentCoord?.lng() || 0,
  });
  const currentAddress = addressData?.addressInfo.fullAddress || '';

  // 출발지 주소 받아오기
  const { data: startAddressData } = useReverseGeoLocation({
    latitude: routesData.startCoord?.lat() || 0,
    longitude: routesData.startCoord?.lng() || 0,
  });
  const startAddress = startAddressData?.addressInfo.fullAddress || '';

  // 보행자 경로 받아오기
  const { data: pedestrainResponse } = useRoutesPedestrain(
    {
      latitude: routesData.startCoord?.lat() || 0,
      longitude: routesData.startCoord?.lng() || 0,
    },
    {
      latitude: routesData.endCoord?.lat() || 0,
      longitude: routesData.endCoord?.lng() || 0,
    }
  );

  // 자동차 경로 받아오기
  const { data: automobileResponse } = useRoutesAutomobile(
    {
      latitude: routesData.startCoord?.lat() || 0,
      longitude: routesData.startCoord?.lng() || 0,
    },
    {
      latitude: routesData.endCoord?.lat() || 0,
      longitude: routesData.endCoord?.lng() || 0,
    }
  );

  // 현위치 정보 받아오기 & 현위치 설정
  useEffect(() => {
    getMyLocation(setCurrentCoord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance]);

  // 보행자 경로 및 시간, 거리 정보 설정하기
  useEffect(() => {
    if (!pedestrainResponse) {
      return;
    }

    const { path, totalDistance, totalTime } =
      parseRoutesResponse(pedestrainResponse);

    setCoords((cur) => ({
      ...cur,
      startPedestrainCoord: path[0],
      endPedestrainCoord: path[path.length - 1],
    }));

    dispatchRoutesData({ type: 'setPathPedestrain', payload: path });
    setRoutesPedestrainResponse({ totalDistance, totalTime });
  }, [pedestrainResponse]);

  // 자동차 경로 및 시간, 거리 정보 설정하기
  useEffect(() => {
    if (!automobileResponse) {
      return;
    }

    const { path, totalDistance, totalTime } =
      parseRoutesResponse(automobileResponse);

    setCoords((cur) => ({
      ...cur,
      startAutomobileCoord: path[0],
      endAutomobileCoord: path[path.length - 1],
    }));

    dispatchRoutesData({ type: 'setPathAutomobile', payload: path });
    setRoutesAutomobileResponse({ totalDistance, totalTime });
  }, [automobileResponse]);

  const setCurrentCoord = useCallback(
    (latitude: number, longitude: number) => {
      const position = new Tmapv3.LatLng(latitude, longitude);
      setCoords((cur) => ({ ...cur, currentCoord: position }));
      if (routesData.pathPedestrain.length == 0) {
        mapInstance?.setCenter(position);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mapInstance]
  );

  const setStartCoord = (latitude: number, longitude: number) => {
    dispatchRoutesData({
      type: 'setStartCoord',
      payload: new Tmapv3.LatLng(latitude, longitude),
    });
  };

  const setEndCoord = (latitude: number, longitude: number) => {
    dispatchRoutesData({
      type: 'setEndCoord',
      payload: new Tmapv3.LatLng(latitude, longitude),
    });
  };

  const setCurrentMarker = (marker: TMapMarker) => {
    setMarkers((cur) => ({ ...cur, currentMarker: marker }));
  };

  const { currentCoord } = coords;
  const { currentMarker } = markers;

  useMarker(
    mapInstance,
    currentCoord,
    currentMarker,
    setCurrentMarker,
    'current'
  );

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    const {
      startPedestrainCoord,
      endPedestrainCoord,
      startAutomobileCoord,
      endAutomobileCoord,
    } = coords;

    let tmpStart: TMapMarker | null;
    let tmpEnd: TMapMarker | null;
    if (routesType === 'pedestrain') {
      if (!startPedestrainCoord || !endPedestrainCoord) {
        return;
      }

      tmpStart = Marker({
        mapContent: mapInstance,
        position: startPedestrainCoord,
        theme: 'start',
      });

      tmpEnd = Marker({
        mapContent: mapInstance,
        position: endPedestrainCoord,
        theme: 'end',
      });

      setMarkers((cur) => ({
        ...cur,
        startPedestrainMarker: tmpStart,
        endPedestrainMarker: tmpEnd,
      }));
    } else {
      if (!startAutomobileCoord || !endAutomobileCoord) {
        return;
      }

      console.log('Automobile Marker');

      tmpStart = Marker({
        mapContent: mapInstance,
        position: startAutomobileCoord,
        theme: 'start',
      });

      tmpEnd = Marker({
        mapContent: mapInstance,
        position: endAutomobileCoord,
        theme: 'end',
      });

      setMarkers((cur) => ({
        ...cur,
        startAutomobileMarker: tmpStart,
        endAutomobileMarker: tmpEnd,
      }));
    }

    return () => {
      tmpStart?.setMap(null);
      tmpEnd?.setMap(null);
    };
  }, [mapInstance, coords, routesType]);

  const setFocus = (lat: number, lon: number) => {
    if (!mapInstance) return;
    const position = new Tmapv3.LatLng(lat, lon);
    mapInstance.setCenter(position);
    mapInstance.setZoom(MAX_ZOOM_LEVEL);
  };

  // 은행 마커 생성
  useEffect(() => {
    const onClickMarker = (id: string) => {
      console.log(id);
      if (selectedBranchId !== id) setSelectedBranchId(id);
    };

    branchList.forEach(
      ({ id, name, position_x: longitude, position_y: latitude, type }) => {
        if (mapInstance && latitude && longitude) {
          console.log(type);
          const position = new Tmapv3.LatLng(+latitude, +longitude);
          const marker = Marker({
            mapContent: mapInstance,
            position,
            theme: type,
            labelText: name,
          });
          marker.on('Click', () => {
            onClickMarker(id);
            setFocus(+latitude, +longitude);
          });
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, branchList]);

  // Pedestrain Polyline 적용 함수
  useEffect(() => {
    if (!mapRef.current?.firstChild || !mapInstance) return;

    const { startCoord, endCoord, pathPedestrain, pathAutomobile } = routesData;

    let tmpPolyline: TMapPolyline | null;
    if (routesType === 'pedestrain') {
      if (!startCoord || !endCoord || pathPedestrain.length === 0) {
        return;
      }
      mapInstance.on('ConfigLoad', () => {
        console.log('Map Loaded!!!');
        tmpPolyline = PolyLine({
          path: pathPedestrain,
          strokeColor: '#3D8BFF',
          strokeWeight: 9,
          mapContent: mapInstance,
        });
        // setPedestrainPolyline(tmpPolyline);
      });
      tmpPolyline = PolyLine({
        path: pathPedestrain,
        strokeColor: '#3D8BFF',
        strokeWeight: 9,
        mapContent: mapInstance,
      });
      // setPedestrainPolyline(tmpPolyline);

      const startLatitude = pathPedestrain[0]._lat;
      const startLongitude = pathPedestrain[0]._lng;
      const position = new Tmapv3.LatLng(startLatitude, startLongitude);
      mapInstance?.setCenter(position);
    } else {
      if (!startCoord || !endCoord || pathAutomobile.length === 0) {
        return;
      }
      mapInstance.on('ConfigLoad', () => {
        console.log('Map Loaded!!!');
        tmpPolyline = PolyLine({
          path: pathAutomobile,
          strokeColor: '#3D8BFF',
          strokeWeight: 9,
          mapContent: mapInstance,
        });
        // setAutomobilePolyline(tmpPolyline);
      });
      tmpPolyline = PolyLine({
        path: pathAutomobile,
        strokeColor: '#3D8BFF',
        strokeWeight: 9,
        mapContent: mapInstance,
      });
      // setAutomobilePolyline(tmpPolyline);

      const startLatitude = pathAutomobile[0]._lat;
      const startLongitude = pathAutomobile[0]._lng;
      const position = new Tmapv3.LatLng(startLatitude, startLongitude);
      mapInstance?.setCenter(position);
    }

    return () => {
      tmpPolyline?.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, routesData, routesType]);

  const setRouteTypeToPedestrain = () => {
    setRoutesType('pedestrain');
  };

  const setRouteTypeToAutomobile = () => {
    setRoutesType('automobile');
  };

  return (
    <MapContext.Provider
      value={{
        mapRef,
        mapFocusOnly,
        currentAddress,
        startAddress,
        setStartCoord,
        setEndCoord,
        selectedBranchId,
        setSelectedBranchId,
        setBranchList,
        routesPedestrainResponse,
        routesAutomobileResponse,
        setFocus,
        routesType,
        setRouteTypeToPedestrain,
        setRouteTypeToAutomobile,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMap = () => useContext(MapContext);
