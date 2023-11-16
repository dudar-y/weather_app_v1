import { Language } from "../types/Setting";
import { getStringDay } from "./getStringDay";
import { getStringMonth } from "./getStringMonth";

export const getStringDate = (lang: Language): string => {
  const today = new Date();

  const month = getStringMonth(today.getMonth(), lang);
  const day = getStringDay(today.getDay(), lang);
  const year = today.getFullYear();
  const date = today.getDate();

  return `${day}, ${date} ${month}, ${year}`;
}
