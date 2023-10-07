import { router } from "../router";
import { RequestHandler } from "express";
import { Methods } from './request'

export function controller(root: string) {
  return function (constructor: new (...args: any[]) => any) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);
    for (let key of methods) {
      const path: string = Reflect.getMetadata("path", constructor.prototype, key);
      const method: Methods = Reflect.getMetadata("method", constructor.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", constructor.prototype, key);
      const handler = constructor.prototype[key];
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middlewares && middlewares.length > 0) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  }
}