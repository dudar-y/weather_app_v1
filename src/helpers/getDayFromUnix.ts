import { Day } from '../types/Day';

export function getDayFromUnix(val: number): Day {
  const date = new Date(val * 1000);

  const day = date.getDay();

  switch (day) {
    case 0:
      return 'sun';
    case 1:
      return 'mon';
    case 2:
      return 'tus';
    case 3:
      return 'wed';
    case 4:
      return 'thu';
    case 5:
      return 'fri';
    case 6:
      return 'sut';
    default:
      return 'sun';
  }
};
