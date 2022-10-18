export interface ICurrentWeather {
  max: ITemperature;
  min: ITemperature;
  humidity: number | null;
  icon: string;
  desc: string;
  day: string;
}

export interface ITemperature {
  metric: number;
  imperial: number;
}
