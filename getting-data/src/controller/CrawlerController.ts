import fs from 'fs';
import path from 'path';
import "reflect-metadata";
import { Request, Response, NextFunction } from 'express';
import { get, use, controller } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crawler';
import Analyzer from '../utils/analyse';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  console.log('checkLogin')
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('test middleware');
  next();
}

@controller('/')
export class CrawlerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData(true));
  }
  @get('/showData')
  @use(checkLogin)
  @use(test)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, '数据不存在'));
    }
  }
}