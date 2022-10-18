import { ICurrentWeather } from "./weather.model";

export interface ICity {
  name: string;
  country: string;
  key: string;
  isDefault: boolean;
  isFavorite: boolean;
}

export interface ICityCard {
  city: ICity;
  weather: ICurrentWeather;
}

export const TEL_AVIV: ICity = {
  name: "Tel Aviv",
  country: "Israel",
  key: "215854",
  isDefault: true,
  isFavorite: false
}
