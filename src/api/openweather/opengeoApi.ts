import { wait } from '../../helpers/wait';

const BASE_DELEY = 1000;
const API_KEY = '271ae053938f8119a30a08d238aea911';
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const REVERSE_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

export const getPlaces = (
  query: string,
) => {
  
  return wait(BASE_DELEY)
    .then(() => fetch(
      `${BASE_URL}?appid=${API_KEY}&q=${query}&limit=5`
      ))
    .then(response => response.json());
};

export const getPlaceByCoord = (
  coord: {latitude: number, longitude: number},
) => {
  const { latitude, longitude } = coord;

  return wait(BASE_DELEY)
    .then(() => fetch(
      `${REVERSE_URL}?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&limit=1`
      ))
    .then(response => response.json());
}
