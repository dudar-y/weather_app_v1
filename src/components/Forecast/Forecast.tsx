import { Day } from '../Day/Day';
import { DayDetail } from '../DayDetail/DayDetail';
import './Forecast.scss';

export const Forecast: React.FC = () => {
  return (
    <section className="forecast">
      <div className="forecast__days">
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
      <div className="forecast__detail">
        <DayDetail />
      </div>
    </section>
  );
};
