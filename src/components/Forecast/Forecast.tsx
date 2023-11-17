import { useState } from 'react';
import cn from 'classnames';
import { wait } from '../../helpers/wait';
import { ForecastType } from '../../types/ForecastType';
import { Day } from '../Day/Day';
import { DayDetail } from '../DayDetail/DayDetail';
import './Forecast.scss';
import { Loader } from '../Loader/Loader';
import { BASE_DELEY } from '../../setting';

import { ReactComponent as Close } from '../../img/svg/cross.svg';

type Props = {
  data: ForecastType[];
  isLoading: boolean;
}

export const Forecast: React.FC<Props> = ({ data, isLoading: isForecastLoading }) => {
  const [selectedDay, setSelectedDay] = useState<ForecastType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDayClick = (data: ForecastType) => {
    setIsLoading(true);
    setSelectedDay(data);
    wait(BASE_DELEY)
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={cn('forecast', { 'forecast--active': selectedDay })}>
      {!isForecastLoading
        ? (<div className="forecast__days">
        {data.map(daylyForecast => (
          <Day
            key={daylyForecast.name}
            data={daylyForecast}
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
          />
        ))}
      </div>)
      : (<Loader />)}
      {selectedDay && (<div className="forecast__detail">
        <DayDetail dayForecast={selectedDay} isLoading={isLoading} />
      </div>)}
      {selectedDay && (
        <button
          name='closeDetails'
          className="forecast__detail-close"
          type="button"
          onClick={() => {
            setSelectedDay(null);
          }}
        >
          <Close width={10} height={10} />
        </button>
      )}
    </section>
  );
};
