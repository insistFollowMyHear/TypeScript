import express, { Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: ['student Yu'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

/**
 * 解决：使用下方方法（中间件）的时候，对 req 和 res 做了修改之后，实际上类型并不能改变
 * custom.d.ts 文件中的代码，实际上是在全局的 Request 接口上添加了一个 teacherName 属性
 */
// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.teacherName = 'ALICE';
//   next();
// })

app.use(router);

app.listen((7001), () => {
  console.log('server is running');
})