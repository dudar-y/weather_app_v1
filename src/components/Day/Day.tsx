import './Day.scss';

import { ReactComponent as SunIcon } from '../../img/svg/sun_1.svg';

export const Day = () => {
  return (
    <div className="forecast__day day">
      <div className="day__name">Середа</div>
      <div className="day__date">08</div>
      <div className="day__month">Листопада</div>
      <div className="day__weather-icon">
        <SunIcon width={40} height={40} />
      </div>
      <div className="day__temp">
        <div className="day__temp-val">
          <span className="day__temp-name">макс</span>
          15°
        </div>
        <div className="day__temp-val">
          <span className="day__temp-name">мін</span>
          7°
        </div>
      </div>
    </div>
  );
};