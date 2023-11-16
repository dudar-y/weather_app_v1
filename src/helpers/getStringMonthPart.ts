import { Language } from "../types/Setting";

export const getStringMonthPart = (month: number, lang: Language): string => {
  switch (month) {
    case 0:
      return lang === 'en' ? 'Jan' : 'Січ';
    case 1:
      return lang === 'en' ? 'Feb' : 'Лют';
    case 2:
      return lang === 'en' ? 'Mar' : 'Бер';
    case 3:
      return lang === 'en' ? 'Apr' : 'Кві';
    case 4:
      return lang === 'en' ? 'May' : 'Трав';
    case 5:
      return lang === 'en' ? 'Jun' : 'Чер';
    case 6:
      return lang === 'en' ? 'Jul' : 'Лип';
    case 7:
      return lang === 'en' ? 'Aug' : 'Сер';
    case 8:
      return lang === 'en' ? 'Sep' : 'Вер';
    case 9:
      return lang === 'en' ? 'Oct' : 'Жовт';
    case 10:
      return lang === 'en' ? 'Nov' : 'Лист';
    case 11:
      return lang === 'en' ? 'Dec' : 'Груд';
    default:
      return lang === 'en' ? 'Jan' : 'Січ';
  }
};
