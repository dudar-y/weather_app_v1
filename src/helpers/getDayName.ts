import { Day } from '../types/Day';
import { Language } from '../types/Setting';

export function getDayName(name: Day, lang: Language): string {
  switch (name) {
    case 'sun':
      return lang === 'en' ? name : 'нд';
    case 'mon':
      return lang === 'en' ? name : 'пн';
    case 'tus':
      return lang === 'en' ? name : 'вт';
    case 'wed':
      return lang === 'en' ? name : 'ср';
    case 'thu':
      return lang === 'en' ? name : 'чт';
    case 'fri':
      return lang === 'en' ? name : 'пт';
    case 'sut':
      return lang === 'en' ? name : 'сб';
    default:
      return lang === 'en' ? name : 'нд';
  }
};
