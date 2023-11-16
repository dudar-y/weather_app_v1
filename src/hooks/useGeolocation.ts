import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { defineLang } from "../helpers/defineLang";

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

const ERROR_GEOLOCATION = {
  uk: 'Для продовження, будь-ласка, дозвольте доступ до вашої геолокації або вибаріть ваше місто в налаштуваннях.',
  en: 'To proceed, please allow access to your location or select your city in the settings.',
}

export const useGeolocation = (): Coordinates => {
  const [coords, setCoords] = useState<Coordinates>(initialCoords);
  const { setting } = useContext(AppContext);

  useEffect(() => {
    console.log('done');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('1');
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude, error: null });
        },
        (error) => {
          console.log('2');
          setCoords({
              latitude: null,
              longitude: null,
              error: defineLang(ERROR_GEOLOCATION, setting.lang)
            });
        }
      );
    } else {
      console.log('3')
      setCoords({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
      });
    }
  }, []);

  return coords;
} 
