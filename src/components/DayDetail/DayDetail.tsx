import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { defineLang } from '../../helpers/defineLang';
import './DayDetail.scss';

import { ReactComponent as Time } from '../../img/svg/time.svg';
import { ReactComponent as Temperature } from '../../img/svg/temp.svg';
import { ReactComponent as Humidity } from '../../img/svg/hum.svg';
import { ReactComponent as Wind } from '../../img/svg/wind.svg';
import { ReactComponent as FeelsLike } from '../../img/svg/feels_like.svg';
import { ForecastType } from '../../types/ForecastType';
import { Loader } from '../Loader/Loader';

const DETAIL_MORNING = {
  uk: 'Ранок',
  en: 'Morning',
};

const DETAIL_DAY = {
  uk: 'День',
  en: 'Day',
};

const DETAIL_NIGHT = {
  uk: 'Ніч',
  en: 'Night',
};

const DETAIL_EVENING = {
  uk: 'Вечір',
  en: 'Evening',
};

type Props = {
  dayForecast: ForecastType;
  isLoading: boolean;
};

export const DayDetail: React.FC<Props> = ({ dayForecast, isLoading }) => {
  const { setting } = useContext(AppContext);
  const { lang } = setting;
  const { times } = dayForecast;

  const isPartOfDay = {
    morning: times.some(hour => hour.time === ('08:00:00' && '11:00:00')),
    day: times.some(hour => hour.time === ('14:00:00' && '17:00:00')),
    evening: times.some(hour => hour.time === ('20:00:00' && '23:00:00')),
    night: times.some(hour => hour.time === ('02:00:00' && '05:00:00')),
  };

  const blankColumn = (
    <td>-</td>
  );

  return (
    <div className="day-detail">
      {!isLoading
        ? (<>
          <div className="day-detail__titles">
            <div className="day-detail__icon">
              <Time width={12} height={12} />
            </div>
            <div className="day-detail__icon day-detail__icon--transform">
              <Temperature width={15} height={15} />
            </div>
            <div className="day-detail__icon">
              <FeelsLike width={15} height={15} />
            </div>
            <div className="day-detail__icon">
              <Humidity width={13} height={13} />
            </div>
            <div className="day-detail__icon day-detail__icon--transform">
              <Wind width={14} height={14} />
            </div>
          </div>
          <table className="day-detail__table">
            <thead className="day-detail__thead">
              <tr>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
                <td colSpan={2}></td>
              </tr>
              <tr>
                {isPartOfDay.night && (<td className="day-detail__part" colSpan={2}>
                  {defineLang(DETAIL_NIGHT, lang)}
                </td>)}
                {isPartOfDay.morning && (<td className="day-detail__part" colSpan={2}>
                  {defineLang(DETAIL_MORNING, lang)}
                </td>)}
                {isPartOfDay.day && (<td className="day-detail__part" colSpan={2}>
                  {defineLang(DETAIL_DAY, lang)}
                </td>)}
                {isPartOfDay.evening && (<td className="day-detail__part" colSpan={2}>
                  {defineLang(DETAIL_EVENING, lang)}
                </td>)}
              </tr>
            </thead>
            <tbody className="day-detail__body">
              <tr className="day-detail__row day-detail__time">
                {times.length % 2 !== 0 && blankColumn}
                {times.map(hour => (
                  <td>{hour.time.split(':').slice(0, 2).join(':')}</td>
                ))}
              </tr>
              <tr className="day-detail__row">
                {times.length % 2 !== 0 && blankColumn}
                {times.map(hour => (
                  <td>{`${Math.round(hour.main_params.temp)}°`}</td>
                ))}
              </tr>
              <tr className="day-detail__row">
                {times.length % 2 !== 0 && blankColumn}
                {times.map(hour => (
                  <td>{`${Math.round(hour.main_params.feels_like)}°`}</td>
                ))}
              </tr>
              <tr className="day-detail__row">
                {times.length % 2 !== 0 && blankColumn}
                {times.map(hour => (
                  <td>{`${hour.main_params.humidity}%`}</td>
                ))}
              </tr>
              <tr className="day-detail__row">
                {times.length % 2 !== 0 && blankColumn}
                {times.map(hour => (
                  <td>{`${hour.wind_params.speed}`}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </>)
        : (
          <div className="day-detail__loader">
            <Loader />
          </div>
        )}
    </div>
  );
};
