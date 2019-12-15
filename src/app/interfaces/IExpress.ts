import { Request, Response, NextFunction as INext, Application } from 'express';

interface IRequest extends Request {
  client: any;
  cronJobManager: any;
}

interface IResponse extends Response {
  i18n: any;
}

export { IRequest, IResponse, INext, Application };
