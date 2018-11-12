import Weather from "../models/weather";
import { validationService } from "./validation.service";
import WeatherDetails from "../models/weatherDetails";
import CompleteWeather from "../models/completeWeather";
import axios from "axios";

export class WeatherService {

  public getData(data: Weather): Promise<CompleteWeather | boolean> | boolean {
    validationService.validateCity(data.city);
    validationService.validateEmail(data.email);
    if (validationService.validateCity(data.city) && validationService.validateEmail(data.email)) {
      return axios.get(`https://www.metaweather.com/api/location/search/?query=${data.city.toLowerCase()}`)
      .then(response => {
        return axios.get(`https://www.metaweather.com/api/location/${response.data[0].woeid}`)
        .then(response => {
          const tempWeather = response.data.consolidated_weather[0];
          const newWeather = new WeatherDetails(tempWeather.the_temp, tempWeather.wind_speed, tempWeather.air_pressure, tempWeather.applicable_date);
          const completeWeather = new CompleteWeather(newWeather.temp, newWeather.speed, newWeather.pressure, newWeather.date, data.city);
          console.log('weather json: ', completeWeather);
          return completeWeather;
        })
        .catch(error => {
          console.log(error);
          return false;
        })
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    } else {
      return false;
    }
  }

}

export const weatherService = new WeatherService();