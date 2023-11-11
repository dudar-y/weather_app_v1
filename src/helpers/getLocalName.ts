import { Language } from "../types/Setting";

export function getLocalName(data: any, lang: Language) {
  if (!data.local_names) {
    return undefined;
  }
  if (lang === 'uk') {
    if (!data.local_names.uk) {
      return undefined;
    } else {
      return data.local_names.uk;
    };
  } else {
    if (!data.local_names.en) {
      return undefined;
    } else {
      return data.local_names.en;
    };
  }
};
