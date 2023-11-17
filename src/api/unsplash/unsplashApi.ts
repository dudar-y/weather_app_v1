import { wait } from '../../helpers/wait';
import { BASE_DELEY } from '../../setting';

const API_KEY = 'q36fsowLWYjOSXdqGHGURp8_EDOf4kmXrQ1aHkBjQ4k';
const BASE_ORIENTATION = 'landscape';
const BASE_URL = 'https://api111.unsplash.com/photos/random/';

export const getPhoto = (query: string[]) => {
  const strQuery = query.join('+');
  return wait(BASE_DELEY)
    .then(() => fetch(`${BASE_URL}?client_id=${API_KEY}&orientation=${BASE_ORIENTATION}&query=${strQuery}`))
    .then(response => response.json());
};
