type Geolocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type SetCoord = (latitude: number, longitude: number) => void;

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
  return navigator.geolocation.watchPosition(onSuccess);
}

export function cancelWatchMyLocation(watchId: number) {
  if (watchId !== -1) {
    navigator.geolocation.clearWatch(watchId);
  }
}
