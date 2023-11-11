import { City } from "../types/City";
import { Language } from "../types/Setting";

export const getCityName = (city: City, lang: Language): string => {
  switch (lang) {
    case 'uk':
      return city.name.uk || city.name.def;
    case 'en':
      return city.name.en || city.name.def;
    default:
      return city.name.def;
  }
};
