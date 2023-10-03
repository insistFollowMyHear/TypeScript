"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['student Yu'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
/**
 * 解决：使用下方方法（中间件）的时候，对 req 和 res 做了修改之后，实际上类型并不能改变
 * custom.d.ts 文件中的代码，实际上是在全局的 Request 接口上添加了一个 teacherName 属性
 */
// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacherName = 'ALICE';
//   next();
// })
app.use(router_1.default);
app.listen((7001), () => {
    console.log('server is running');
});
