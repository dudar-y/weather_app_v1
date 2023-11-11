import { useEffect, useState } from "react";
import { getForecastData } from "../api/openweather/openweatherApi";
import { ForecastType } from "../types/ForecastType";

export const useForecast = (
  coord: { latitude: number | null, longitude: number | null },
  lang: string = 'en',
  units: string = 'metric',
): [ForecastType[], string] => {
  const [forecast, setForecast] = useState<ForecastType[]>([]);
  const [error, setError] = useState('');
  const [resp, setResp] = useState({});

  useEffect(() => {
    if (coord.latitude !== null && coord.longitude !== null) {
      const { latitude, longitude } = coord;
    
      getForecastData({latitude, longitude}, lang, units)
        .then((res) => {
          setResp(res);
          setForecast([]);
        })
        .catch((e) => {
          console.log(e);
          setError('Cant download Forecast');
        });
    } else {
      setError('Cant read coords');
    }
  }, []);

  console.log(resp);
  console.log(error);

  return [forecast, error];
}