import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

const initialCoords = {
  latitude: null,
  longitude: null,
  error: null,
};

export const useGeolocation = (): Coordinates => {
  const [coords, setCoords] = useState<Coordinates>(initialCoords);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude, error: null });
        },
        (error) => {
          setCoords({ latitude: null, longitude: null, error: error.message });
        }
      );
    } else {
      setCoords({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
      });
    }
  }, []);

  return coords;
} 
