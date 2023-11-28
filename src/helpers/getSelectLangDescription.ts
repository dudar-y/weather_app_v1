import { Language } from "../types/Setting";

export const getSelectLangDescription = (
  desc: string, lang: Language
) => {
  switch (desc) {
    case 	'clear sky':
      return lang === 'en' ? desc : 'ясно';
    case 	'few clouds':
      return lang === 'en' ? desc : 'незначна хмарність';
    case 	'scattered clouds':
      return lang === 'en' ? desc : 'хмарно з проясненнями';
    case 	'broken clouds':
      return lang === 'en' ? desc : 'хмарно';
    case 	'shower rain':
      return lang === 'en' ? desc : 'злива';
    case 	'rain':
      return lang === 'en' ? desc : 'дощ';
    case 	'thunderstorm':
      return lang === 'en' ? desc : 'гроза';
    case 	'snow':
      return lang === 'en' ? desc : 'сніг';
    case 	'mist':
      return lang === 'en' ? desc : 'туман';
    case 	'thunderstorm with light rain':
      return lang === 'en' ? desc : 'гроза з невеликим дощем';
    case 	'thunderstorm with rain':
      return lang === 'en' ? desc : 'гроза з дощем';
    case 	'thunderstorm with heavy rain':
      return lang === 'en' ? desc : 'гроза з сильним дощем';
    case 	'light thunderstorm':
      return lang === 'en' ? desc : 'легка гроза';
    case 	'heavy thunderstorm':
      return lang === 'en' ? desc : 'сильна гроза';
    case 	'ragged thunderstorm':
      return lang === 'en' ? desc : 'грози';
    case 	'thunderstorm with light drizzle':
      return lang === 'en' ? desc : 'гроза з легкою мрякою';
    case 	'thunderstorm with drizzle':
      return lang === 'en' ? desc : 'гроза з мрякою';
    case 	'thunderstorm with heavy drizzle':
      return lang === 'en' ? desc : 'гроза з сильною мрякою';
    case 	'light intensity drizzle':
      return lang === 'en' ? desc : 'невелика мряка';
    case 	'drizzle':
      return lang === 'en' ? desc : 'мряка';
    case 	'heavy intensity drizzle':
      return lang === 'en' ? desc : 'сильна мряка';
    case 	'light intensity drizzle rain':
      return lang === 'en' ? desc : 'мряка з дощем';
    case 	'drizzle rain':
      return lang === 'en' ? desc : 'мряка з дощем';
    case 	'heavy intensity drizzle rain':
      return lang === 'en' ? desc : 'сильна мряка з дощем';
    case 	'shower rain and drizzle':
      return lang === 'en' ? desc : 'мряка зі зливами';
    case 	'heavy shower rain and drizzle':
      return lang === 'en' ? desc : 'сильна злива';
    case 	'shower drizzle':
      return lang === 'en' ? desc : 'сильна мряка';
    case 	'light rain':
      return lang === 'en' ? desc : 'невеликий дощ';
    case 	'moderate rain':
      return lang === 'en' ? desc : 'дощ';
    case 	'heavy intensity rain':
      return lang === 'en' ? desc : 'сильний дощ';
    case 	'very heavy rain':
      return lang === 'en' ? desc : 'злива';
    case 	'extreme rain':
      return lang === 'en' ? desc : 'сильна злива';
    case 	'freezing rain':
      return lang === 'en' ? desc : 'крижаний дощ';
    case 	'light intensity shower rain':
      return lang === 'en' ? desc : 'невилика злива';
    case 	'heavy intensity shower rain':
      return lang === 'en' ? desc : 'сильна злива';
    case 	'ragged shower rain':
      return lang === 'en' ? desc : 'злива з вітром';
    case 	'light snow':
      return lang === 'en' ? desc : 'легкий сніг';
    case 	'heavy snow':
      return lang === 'en' ? desc : 'сильний сніг';
    case 	'sleet':
      return lang === 'en' ? desc : 'мокрий сніг';
    case 	'light shower sleet':
      return lang === 'en' ? desc : 'невеликий мокрий сніг';
    case 	'shower sleet':
      return lang === 'en' ? desc : 'сильний мокрий сніг';
    case 	'light rain and snow':
      return lang === 'en' ? desc : 'дрібний дощ зі снігом';
    case 	'rain and snow':
      return lang === 'en' ? desc : 'дощ зі снігом';
    case 	'light shower snow':
      return lang === 'en' ? desc : 'дрібний сніг';
    case 	'shower snow':
      return lang === 'en' ? desc : 'снігопад';
    case 	'heavy shower snow':
      return lang === 'en' ? desc : 'сильний снігопад';
    case 	'smoke':
      return lang === 'en' ? desc : 'дим';
    case 	'haze':
      return lang === 'en' ? desc : 'невнликий туман';
    case 	'sand/dust whirls':
      return lang === 'en' ? desc : 'піщана буря';
    case 	'fog':
      return lang === 'en' ? desc : 'туман';
    case 	'sand':
      return lang === 'en' ? desc : 'пісок';
    case 	'dust':
      return lang === 'en' ? desc : 'пил';
    case 	'volcanic ash':
      return lang === 'en' ? desc : 'вулканічний попіл';
    case 	'squalls':
      return lang === 'en' ? desc : 'шквали';
    case 	'tornado':
      return lang === 'en' ? desc : 'торнадо';
    case 	'overcast clouds':
      return lang === 'en' ? desc : 'сильна хмарність';
    default:
      return lang === 'en' ? desc : 'хмарно';
  };
};
