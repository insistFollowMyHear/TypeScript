"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const router_1 = require("../router");
function controller(root) {
    return function (constructor) {
        const methods = Object.getOwnPropertyNames(constructor.prototype);
        for (let key of methods) {
            const path = Reflect.getMetadata("path", constructor.prototype, key);
            const method = Reflect.getMetadata("method", constructor.prototype, key);
            const middlewares = Reflect.getMetadata("middlewares", constructor.prototype, key);
            const handler = constructor.prototype[key];
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`;
                if (middlewares && middlewares.length > 0) {
                    router_1.router[method](fullPath, ...middlewares, handler);
                }
                else {
                    router_1.router[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
