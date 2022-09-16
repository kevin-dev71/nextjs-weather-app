import { useRouter } from "next/router";

import * as localesObj from "@/src/config/locales.json";
import { LocalesObj } from "@/src/ts/interfaces";

export const OPENWEATHER_LANG_MAP = {
  "es-ES": "es",
  "en-US": "en",
};

export type LocalesObjKey = keyof typeof OPENWEATHER_LANG_MAP;

const useLocale = () => {
  // locales
  const { locale = "es-ES" } = useRouter();
  // states

  const t = (word: string) => {
    return (localesObj as LocalesObj)[locale][word] ?? `pending translate ${word}`;
  };

  return { t, locale };
};
export default useLocale;
