import { LangVar } from "../types/LangVar";
import { Language } from "../types/Setting";

export function defineLang(obj: LangVar, lang: Language): string {
  return lang === 'en' ? obj.en : obj.uk;
};
