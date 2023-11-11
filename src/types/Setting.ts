export type Language = 'uk' | 'en';

export type Units = 'classic' | 'metric' | 'imperial';

export type Setting = {
  lang: Language;
  useGeolocation: boolean;
  units: Units;
}
