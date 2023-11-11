import { Day } from "./Day";
import { HourlyForecast } from "./HourlyForecast";

export type ForecastType = {
  name: Day;
  date: string;
  times: HourlyForecast[];
}
