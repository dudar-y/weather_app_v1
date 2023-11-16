export type Weather = {
  main_params: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sunrise?: string;
    sunset?: string;
    rain?: boolean,
  },
  info_params: {
    status: string;
    description: string;
    icon?: string;
  },
  wind_params: {
    speed: number;
    gust: number;
  },
};
