import { RequestHandler } from "restify";

export interface HttpServer {
  get(url: string | RegExp, requestHandler: RequestHandler): void;
}