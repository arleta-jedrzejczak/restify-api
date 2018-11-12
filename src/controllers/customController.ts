import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "restify";
import * as restify from "restify";
import { weatherService } from "../services/weather.service";
import CompleteWeather from "../models/completeWeather";

export class CustomController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get("/", restify.plugins.serveStatic({
      directory: __dirname,
      default: 'index.html'
    }));
    httpServer.get("/weather", this.getWeather.bind(this));
  }

  private async getWeather(req: Request, res: Response): Promise<void> {
    const weather: boolean | CompleteWeather = await weatherService.getData(req.query);
    res.send(weather ? 200 : 404, weather);
  }
}