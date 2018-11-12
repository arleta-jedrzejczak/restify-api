import { HttpServer } from "./httpServer";
import * as restify from "restify";
import { RequestHandler, Server } from "restify";
import { CONTROLLERS } from "../controllers";

export class ApiServer implements HttpServer {

  private restify: Server;

  public get(url: string, requestHandler: RequestHandler): void {
    this.addRoute('get', url, requestHandler);
  }

  public start(port: number): void {
    this.restify = restify.createServer();
    this.restify.use(restify.plugins.bodyParser());
    this.restify.use(restify.plugins.queryParser());

    CONTROLLERS.forEach(controller => {
      controller.initialize(this);
    });

    this.restify.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    })
  }

  private addRoute(method: 'get', url: string | RegExp, requestHandler: RequestHandler) {
    this.restify[method](url, async(req, res, next) => {
      try {
        await requestHandler(req, res, next);
      }
      catch(error) {
        console.log(error);
        res.send(500, error);
      }
    });
    console.log(`Added route ${method.toUpperCase}: ${url}`);
  }
}