"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoginController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
require("reflect-metadata");
const decorator_1 = require("../decorator");
const util_1 = require("../utils/util");
let LoginController = LoginController_1 = class LoginController {
    static isLogin(req) {
        return !!(req.session ? req.session.login : false);
    }
    login(req, res) {
        const { password } = req.body;
        const isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            res.json((0, util_1.getResponseData)(false, '已经登陆过'));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json((0, util_1.getResponseData)(true));
            }
            else {
                res.json((0, util_1.getResponseData)(false, '登陆失败'));
            }
        }
    }
    logout(req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json((0, util_1.getResponseData)(true));
    }
    home(req, res) {
        const isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            res.send(`
        <html>
          <body>
            <a href='/getData'>爬取内容</a>
            <a href='/showData'>展示内容</a>
            <a href='/logout'>退出</a>
          </body>
        </html>
      `);
        }
        else {
            res.send(`
        <html>
          <body>
            <form method="post" action="/login">
              <input type="password" name="password" />
              <button>登陆</button>
            </form>
          </body>
        </html>
      `);
        }
    }
};
__decorate([
    (0, decorator_1.post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "login", null);
__decorate([
    (0, decorator_1.get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "logout", null);
__decorate([
    (0, decorator_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "home", null);
LoginController = LoginController_1 = __decorate([
    (0, decorator_1.controller)('/')
], LoginController);
exports.LoginController = LoginController;