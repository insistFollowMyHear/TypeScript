import "reflect-metadata";
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/api')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response):void {
    const isLogin = LoginController.isLogin(req);
    const result = getResponseData<responseRequest.isLogin>(isLogin)
    res.json(result);
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.json(getResponseData<responseRequest.login>(true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData<responseRequest.login>(true));
      } else {
        res.json(getResponseData<responseRequest.login>(false, '登陆失败'));
      }
    }
  }
  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseRequest.logout>(true));
  }
}