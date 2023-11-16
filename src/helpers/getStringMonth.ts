import { Language } from "../types/Setting";

export const getStringMonth = (month: number, lang: Language): string => {
  switch (month) {
    case 0:
      return lang === 'en' ? 'January' : 'Січня';
    case 1:
      return lang === 'en' ? 'February' : 'Лютого';
    case 2:
      return lang === 'en' ? 'March' : 'Березня';
    case 3:
      return lang === 'en' ? 'April' : 'Квітня';
    case 4:
      return lang === 'en' ? 'May' : 'Травня';
    case 5:
      return lang === 'en' ? 'June' : 'Червня';
    case 6:
      return lang === 'en' ? 'July' : 'Липня';
    case 7:
      return lang === 'en' ? 'August' : 'Серпня';
    case 8:
      return lang === 'en' ? 'September' : 'Вересня';
    case 9:
      return lang === 'en' ? 'October' : 'Жовтня';
    case 10:
      return lang === 'en' ? 'November' : 'Листопада';
    case 11:
      return lang === 'en' ? 'December' : 'Грудня';
    default:
      return lang === 'en' ? 'January' : 'Січня';
  }
};
