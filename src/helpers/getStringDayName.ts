import { Day } from '../types/Day';
import { Language } from '../types/Setting';

export function getStringDayName(day: Day, lang: Language): string {
  switch (day) {
    case 'sun':
      return lang === 'en' ? 'Sunday' : 'Неділя';
    case 'mon':
      return lang === 'en' ? 'Monday' : 'Понеділок';
    case 'tus':
      return lang === 'en' ? 'Tuesday' : 'Вівторок';
    case 'wed':
      return lang === 'en' ? 'Wednesday' : 'Середа';
    case 'thu':
      return lang === 'en' ? 'Thursday' : 'Четвер';
    case 'fri':
      return lang === 'en' ? 'Friday' : 'П\'ятниця';
    case 'sut':
      return lang === 'en' ? 'Saturday' : 'Субота';
    default:
      return lang === 'en' ? 'Sunday' : 'Неділя';
  }
};