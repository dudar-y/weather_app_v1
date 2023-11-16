import { Language } from '../types/Setting';

export function getStringDay(day: number, lang: Language): string {
  switch (day) {
    case 0:
      return lang === 'en' ? 'Sunday' : 'Неділя';
    case 1:
      return lang === 'en' ? 'Monday' : 'Понеділок';
    case 2:
      return lang === 'en' ? 'Tuesday' : 'Вівторок';
    case 3:
      return lang === 'en' ? 'Wednesday' : 'Середа';
    case 4:
      return lang === 'en' ? 'Thursday' : 'Четвер';
    case 5:
      return lang === 'en' ? 'Friday' : 'П\'ятниця';
    case 6:
      return lang === 'en' ? 'Saturday' : 'Субота';
    default:
      return lang === 'en' ? 'Sunday' : 'Неділя';
  }
};
