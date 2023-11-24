import { useCallback, useEffect, useState } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, []);

  const handleError = useCallback((positionError: GeolocationPositionError) => {
    setError(positionError.message);
  }, []);

  const getGeoLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [handleSuccess, handleError]);

  useEffect(() => {
    getGeoLocation();
  }, [getGeoLocation]);

  return {
    error,
    getGeoLocation,
    latitude: location?.latitude,
    longitude: location?.longitude,
  };
};
