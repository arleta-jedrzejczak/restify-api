export class WeatherDetails {
  public temp: number;
  public speed: number;
  public pressure: number;
  public date: string;

  constructor(temp: number, speed: number, pressure: number, date: string) {
    this.temp = Math.floor(temp);
    this.speed = Math.floor(speed);
    this.pressure = Math.floor(pressure);
    this.date = date;
  }
}

export default WeatherDetails;