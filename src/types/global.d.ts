import { TMap, TMapLatLng, TMapSize } from './tmap';

declare global {
  interface Window {
    Tmapv3: {
      Map: new (
        element: HTMLElement | string,
        options?: {
          center?: TMapLatLng;
          scaleBar?: boolean;
          width?: string | number;
          height?: string | number;
          zoom?: number;
          zoomControl?: boolean;
        }
      ) => TMap;
      LatLng: new (lat, lon) => TMapLatLng;
      Marker: new (options?: {
        map: TMap;
        position: TMapLatLng;
        iconHTML?: string;
        iconSize?: TMapSize;
        label?: string;
        icon?: string;
      }) => TMapMarker;
      Size: new (width: number, height: number) => TMapSize;
      Polyline: new (options?: {
        path: TMapLatLng[];
        strokeColor: string;
        strokeWeight: number;
        strokeOpacity?: number;
        direction: boolean;
        map: TMap;
      }) => TMapPolyline;
    };
  }

  type PageData<T, P> = {
    data: T;
    pagination: P;
  };

  type Pagination = {
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
  };

  type TotalPagination = {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export {};
