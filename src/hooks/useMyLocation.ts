type Geolocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type SetCoord = (latitude: number, longitude: number) => void;

type GeolocationOptions = {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
};

export function getMyLocation(setCoord: SetCoord) {
  const onSuccess = (position: Geolocation) => {
    const { latitude, longitude } = position.coords;
    setCoord(latitude, longitude);
  };
  navigator.geolocation.getCurrentPosition(onSuccess);
}

export function watchMyLocation(setCoord: SetCoord) {
  const onSuccess = (position: Geolocation) => {
    const { latitude, longitude } = position.coords;
    setCoord(latitude, longitude);
  };
  const option: GeolocationOptions = {
    maximumAge: 30000,
  };
  return navigator.geolocation.watchPosition(onSuccess, () => {}, option);
}

export function cancelWatchMyLocation(watchId: number) {
  if (watchId !== -1) {
    navigator.geolocation.clearWatch(watchId);
  }
}
