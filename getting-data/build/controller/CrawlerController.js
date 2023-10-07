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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const decorator_1 = require("../decorator");
const util_1 = require("../utils/util");
const crawler_1 = __importDefault(require("../utils/crawler"));
const analyse_1 = __importDefault(require("../utils/analyse"));
const checkLogin = (req, res, next) => {
    const isLogin = !!(req.session ? req.session.login : false);
    console.log('checkLogin');
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, '请先登录'));
    }
};
const test = (req, res, next) => {
    console.log('test middleware');
    next();
};
let CrawlerController = class CrawlerController {
    getData(req, res) {
        const secret = 'secretKey';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = analyse_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true));
    }
    showData(req, res) {
        try {
            const position = path_1.default.resolve(__dirname, '../../data/course.json');
            const result = fs_1.default.readFileSync(position, 'utf8');
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, '数据不存在'));
        }
    }
};
__decorate([
    (0, decorator_1.get)('/getData'),
    (0, decorator_1.use)(checkLogin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrawlerController.prototype, "getData", null);
__decorate([
    (0, decorator_1.get)('/showData'),
    (0, decorator_1.use)(checkLogin),
    (0, decorator_1.use)(test),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrawlerController.prototype, "showData", null);
CrawlerController = __decorate([
    (0, decorator_1.controller)('/')
], CrawlerController);
exports.CrawlerController = CrawlerController;
