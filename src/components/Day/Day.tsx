import './Day.scss';
import cn from 'classnames';

import { ForecastType } from '../../types/ForecastType';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { getStringMonthPart } from '../../helpers/getStringMonthPart';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import { getDayName } from '../../helpers/getDayName';

import { ReactComponent as ArrowUp } from '../../img/svg/arrow_top.svg';
import { ReactComponent as ArrowDown } from '../../img/svg/arrow_down.svg';

const ARROW_ICON_SIZE = 12;

type Props = {
  data: ForecastType;
  onDayClick: (v: ForecastType) => void;
  selectedDay: ForecastType | null;
}

export const Day: React.FC<Props> = ({ data, onDayClick, selectedDay }) => {
  const { setting } = useContext(AppContext);
  const { lang, units } = setting;
  const date = data.date.split('.');

  // console.log(data);

  const month = getStringMonthPart(+date[1] - 1, lang);
  const num = date[0];

  const minTemp = () => {
    const temps = data.times.map(frc => frc.main_params.temp);
    const min = Math.min(...temps);

    return Math.floor(min);
  }

  const maxTemp = () => {
    const temps = data.times.map(frc => frc.main_params.temp);
    const min = Math.max(...temps);

    return Math.ceil(min);
  };

  const mainTime = data.times.find(frc => frc.time === '14:00:00') || data.times[0];

  return (
    <button
      className={cn('forecast__day day', { 'day--active': data === selectedDay })}
      type='button'
      onClick={() => {
        if (data === selectedDay) {
          return;
        }

        onDayClick(data);
      }}
    >
      <div className="day__name">{getDayName(data.name, lang)}</div>
      <div className="day__date">
        {`${num} ${month}`}
      </div>
      <div className="day__weather-icon">
        <WeatherIcon width={35} desc={mainTime.info_params.description} />
      </div>
      <div className="day__temp">
        <div className="day__temp-val">
          <div className="day__temp-arrow">
            <ArrowDown width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} />
          </div>
          {`${minTemp()}°`}
        </div>
        <div className="day__temp-val">
          <div className="day__temp-arrow">
            <ArrowUp width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} />
          </div>
          {`${maxTemp()}°`}
        </div>
      </div>
    </button>
  );
};
