import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { AppContext } from '../../AppContext';
import { Weather } from '../../types/Weather';
import './WeatherNow.scss';
import { getCityName } from '../../helpers/getCityName';
import { getTemperatureUnits, getWindUnits } from '../../helpers/getUnits';
import { getStringDate } from '../../helpers/getStringDate';

import { ReactComponent as ArrowUp } from '../../img/svg/arrow_top.svg';
import { ReactComponent as ArrowDown } from '../../img/svg/arrow_down.svg';
import { ReactComponent as WindIcon } from '../../img/svg/wind.svg'
import { ReactComponent as HumIcon } from '../../img/svg/hum.svg'
import { ReactComponent as FeelsLikeIcon } from '../../img/svg/feels_like.svg'
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import { Loader } from '../Loader/Loader';

type Props = {
  data: Weather | null;
  error: string;
  isLoading: boolean;
}

export const WeatherNow: React.FC<Props> = ({ data, error, isLoading }) => {
  const { city, setting } = useContext(AppContext);

  const { lang, units } = setting;

  const date = useMemo(() => {
    return getStringDate(lang).split(',');
  }, [lang]);

  const today = new Date().toLocaleDateString();

  const getTempStyles = () => {
    if (!data) {
      return {
        size: '85px',
        height: '60px',
      };
    }

    const val = Math.round(data.main_params.temp).toString();
    switch (val?.length) {
      case 1:
        return {
          size: '125px',
          height: '90px',
        };
      case 2:
        return {
          size: '85px',
          height: '60px',
        };
      case 3:
        return {
          size: '55px',
          height: '50px',
        };
      case 4:
        return {
          size: '45px',
          height: '50px',
        };
      default:
        return {
          size: '80px',
          height: '60px',
        };
    }
  };

  const tempStyles = useMemo(() => {
    return getTempStyles();
  }, [data?.main_params.temp, getTempStyles]);

  return (
    <div className={cn('weather-now', { 'weather-now--error': error })}>
      {error && (
        <div className="weather-now__error">{error}</div>
      )}
      {isLoading && !error && (
        <Loader />
      )}
      {data && !error && !isLoading && (
        <>
          <div className="weather-now__top">
            <div className="weather-now__location">{getCityName(city, lang)}</div>
            <div className="weather-now__temps">
              <div className="weather-now__minmax">
                <div className="weather-now__arrow">
                  <ArrowDown width={16} height={16} />
                </div>
                {`${Math.floor(data.main_params.temp_min)}°`}
              </div>
              <div className="weather-now__minmax">
                <div className="weather-now__arrow">
                  <ArrowUp width={16} height={16} />
                </div>
                {`${Math.ceil(data.main_params.temp_max)}°`}
              </div>
            </div>
          </div>
          <div className="weather-now__center">
            <div className="weather-now__center-left">
              <div className="weather-now__day">{date[0]}</div>
              <div className="weather-now__date">{today}</div>
              <div className="weather-now__info">
                <div className="weather-now__icon">
                  <WindIcon width={16} height={16} />
                </div>
                {`${data.wind_params.speed} ${getWindUnits(units)}`}
              </div>
              <div className="weather-now__info">
                <div className="weather-now__icon">
                  <HumIcon width={16} height={16} />
                </div>
                {`${data.main_params.humidity} %`}
              </div>
              <div className="weather-now__info">
                <div className="weather-now__icon">
                  <FeelsLikeIcon width={16} height={16} />
                </div>
                {`${Math.round(data.main_params.feels_like)}${getTemperatureUnits(units)}`}
              </div>
            </div>
            <div className="weather-now__center-center">
              <div className="weather-now__icon weather-now__icon--main">
                <WeatherIcon width={85} desc={data.info_params.description} />
                <div className="weather-now__info--desc">{data.info_params.description.toUpperCase()}</div>
              </div>
            </div>
            <div className="weather-now__center-right">
              <div
                className="weather-now__temp"
                style={{ fontSize: tempStyles.size, lineHeight: tempStyles.height }}
              >
                {Math.round(data.main_params.temp)}
                <sup className="weather-now__temp-units">{getTemperatureUnits(units)}</sup>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
