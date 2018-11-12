import "reflect-metadata";
import { ApiServer } from "./server";

const server = new ApiServer();
server.start(parseInt(process.env.PORT) || 8080);