import { RequestHandler } from "express";
import { CrawlerController, LoginController } from "../controller"

export function use(middleware: RequestHandler) {
  return function(target: CrawlerController | LoginController, key: string) {
    const originMiddleware = Reflect.getMetadata("middlewares", target, key) || [];
    originMiddleware.push(middleware);
    Reflect.defineMetadata("middlewares", originMiddleware, target, key);
  }
}