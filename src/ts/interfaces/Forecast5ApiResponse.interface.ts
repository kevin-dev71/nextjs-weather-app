/* eslint-disable no-use-before-define */
export interface Forecast5ApiResponse {
  city: City;
  cnt: number;
  cod: string;
  list: List[];
  message: number;
}

export interface List {
  clouds: Clouds;
  dt: number;
  dt_txt: Date;
  main: MainClass;
  pop: number;
  rain?: Rain;
  sys: Syst;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export interface Clouds {
  all: number;
}

export interface MainClass {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

export interface Rain {
  "3h": number;
}

export interface Syst {
  pod: Pod;
}

export enum Pod {
  D = "d",
  N = "n",
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: MainEnum;
}

export enum MainEnum {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
}

export interface Wind {
  deg: number;
  gust?: number;
  speed: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}
