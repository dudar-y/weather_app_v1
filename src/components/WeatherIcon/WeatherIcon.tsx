import React from 'react';

import { ReactComponent as Cloud } from '../../img/weather/cloud.svg';
import { ReactComponent as CloudyWithRain } from '../../img/weather/cloudy_with_rain.svg';
import { ReactComponent as CloudyWithSnow } from '../../img/weather/cloudy_with_snow.svg';
import { ReactComponent as CloudyWithSnowfall } from '../../img/weather/cloudy_with_snowfall.svg';
import { ReactComponent as CloudyWithThunder } from '../../img/weather/cloudy_with_thunderstorms.svg';
import { ReactComponent as Cloudy } from '../../img/weather/cloudy.svg';
import { ReactComponent as HeavyRain } from '../../img/weather/heavy_rain.svg';
import { ReactComponent as Mist } from '../../img/weather/mist.svg';
import { ReactComponent as Moon } from '../../img/weather/moon.svg';
import { ReactComponent as Night } from '../../img/weather/night.svg';
import { ReactComponent as RainWithLightning } from '../../img/weather/rain_with_lightning.svg';
import { ReactComponent as Rainstorm } from '../../img/weather/rainstorm.svg';
import { ReactComponent as RainyCloud } from '../../img/weather/rainy_cloud.svg';
import { ReactComponent as SnowAndRain } from '../../img/weather/snow_and_rain.svg';
import { ReactComponent as SnowfallAtNight } from '../../img/weather/snowfall_at_night.svg';
import { ReactComponent as Somber } from '../../img/weather/somber.svg';
import { ReactComponent as Thunder } from '../../img/weather/thunder.svg';
import { ReactComponent as Sun } from '../../img/weather/sun.svg';
import { ReactComponent as MoreCloudly } from '../../img/weather/more_cloudly.svg';

type Props = {
  desc: string;
  width: number;
}

export const WeatherIcon: React.FC<Props> = ({ desc, width}) => {
  const time = new Date().getHours();
  const isNight = (time > 22) || (time < 5);

  const icon = () => {
    switch (desc) {
      case 'few clouds':
        return !isNight 
          ? <Cloudy width={width} height={width} />
          : <Night width={width} height={width} />;
      case 'scattered clouds':
      case 'broken clouds':
        return <MoreCloudly width={width} height={width} />;
      case 'overcast clouds':
        return <Somber width={width} height={width} />;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'sand/dust whirls':
      case 'fog':
      case 'dust':
      case 'sand':
      case 'volcanic ash':
      case 'squalls':
      case 'tornado':
        return <Mist width={width} height={width} />;
      case 'light snow':
        return <CloudyWithSnow width={width} height={width} />;
      case 'snow':
      case 'heavy snow':
        return isNight
          ? <CloudyWithSnowfall width={width} height={width} />
          : <SnowfallAtNight width={width} height={width} />;
      case 'light shower sleet':
      case 'shower sleet':
      case 'light rain and snow':
      case 'rain and snow':
      case 'shower snow':
      case 'heavy shower snow':
      case 'light shower snow':
      case 'freezing rain':
        return <SnowAndRain width={width} height={width} />;
      case 'light intensity drizzle':
      case 'drizzle':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
        return <CloudyWithRain width={width} height={width} />;
      case 'light rain':
      case 'moderate rain':
      case 'shower rain':
      case 'злива':
        return <RainyCloud width={width} height={width} />;
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
      case 'heavy intensity shower rain':
        return <HeavyRain width={width} height={width} />;
      case 'extreme rain':
      case 'ragged shower rain':
        return <Rainstorm width={width} height={width} />;
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
        return <RainWithLightning width={width} height={width} />;
      case 'light thunderstorm':
      case 'thunderstorm':
        return <CloudyWithThunder width={width} height={width} />;
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
        return <Thunder width={width} height={width} />;
      case 'clear sky':
        return !isNight 
          ? <Sun width={width} height={width} />
          : <Moon width={width} height={width} />
      default:
        return <Cloud width={width} height={width} />
    }
  }
  return (
    icon()
  );
};
