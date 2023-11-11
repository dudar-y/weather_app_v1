import React, { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../../AppContext';
import { Weather } from '../../types/Weather';
import './WeatherNow.scss';
import { getCityName } from '../../helpers/getCityName';

type Props = {
  data: Weather | null;
  error: string;
}

export const WeatherNow: React.FC<Props> = ({ data, error }) => {
  const { city, setting } = useContext(AppContext);

  const { lang } = setting;

  return (
    <div className={cn('weather-now', {'weather-now--error': error})}>
      {error && (
        <div className="weather-now__error">{error}</div>
      )}
      {data && !error && (
        <>
          <div className="weather-now__icon"></div>
          <div className="weather-now__location">{getCityName(city, lang)}</div>
          <div className="weather-now__temp">{Math.round(data.main_params.temp)}
            <sup className="weather-now__temp-units">°C</sup>
          </div>
          <div className="weather-now__info">Ясно Хмарно</div>
          <div className="weather-now__wind">Вітер: {data.wind_params.speed} м/с</div>
        </>
      )}
    </div>
  );
};
