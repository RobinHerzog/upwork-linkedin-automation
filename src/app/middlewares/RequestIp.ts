/**
 * Get client IP address.
 */
import * as requestIp from 'request-ip';
import { IRequest, IResponse, INext } from 'src/app/interfaces/IExpress';


class RequestIp {

  static getIP(req: IRequest, res: IResponse, next: INext): void {
    req.client.ip = requestIp.getClientIp(req);
    next();
  }

}

export default RequestIp;
