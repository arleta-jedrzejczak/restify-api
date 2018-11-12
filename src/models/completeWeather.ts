import WeatherDetails from "./weatherDetails";

export class CompleteWeather extends WeatherDetails {
  public city: string;

  constructor(temp: number, speed: number, pressure: number, date: string, city: string) {
    super(temp, speed, pressure, date);
    this.city = city;
  }
}

export default CompleteWeather;