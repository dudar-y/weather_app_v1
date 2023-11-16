import { Units } from "../types/Setting";

export const getTemperatureUnits = (units: Units): string => {
  switch (units) {
    case 'classic':
      return '°K';
    case 'imperial':
      return '°F';
    case 'metric':
      return '°C';
    default:
      return '°C';
  };
};

export const getWindUnits = (units: Units) => {
  switch (units) {
    case 'classic':
      return 'm/s';
    case 'imperial':
      return 'km/h';
    case 'metric':
      return 'm/s';
    default:
      return 'm/s';
  };
}
