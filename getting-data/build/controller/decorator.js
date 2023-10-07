"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.use = exports.controller = void 0;
const router_1 = require("../router");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(constructor) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);
    for (let key of methods) {
        const path = Reflect.getMetadata("path", constructor.prototype, key);
        const method = Reflect.getMetadata("method", constructor.prototype, key);
        const handler = constructor.prototype[key];
        const middleware = Reflect.getMetadata("middleware", constructor.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router_1.router[method](path, middleware, handler);
            }
            else {
                router_1.router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
