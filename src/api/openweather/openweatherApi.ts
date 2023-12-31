import { wait } from '../../helpers/wait';
import { BASE_DELEY } from '../../setting';

const API_KEY = '271ae053938f8119a30a08d238aea911';
const API_KEY_RESERV = '9ea1380a9fd133a6c716934a9b2d19ce';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getForecastData = (
  coord: {latitude: number, longitude: number},
  lang: string = 'en',
  units: string = 'metric',
) => {
  
  return wait(BASE_DELEY)
    .then(() => fetch(
      `${BASE_URL}?appid=${API_KEY_RESERV}&lat=${coord.latitude}&lon=${coord.longitude}&lang=${lang}&units=${units}`
      ))
    .then(response => response.json());
};
