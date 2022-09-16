export type LocaleIndex = "en-US" | "es-ES";

export interface LocalesObj {
  [key: string]: {
    [key: string]: string;
  };
}
