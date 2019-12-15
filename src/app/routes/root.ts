import { IRequest, IResponse, INext } from 'src/app/interfaces/IExpress';
import TimeLib from '../lib/TimeLib';
import config from '../config';


class Root {

  static apiData(req: IRequest, res: IResponse, next: INext) {

    // get uptime
    const uptime = process.uptime();
    const uptime_human = new TimeLib().secondsToString(uptime);

    const jdata = {
      api: {
        name: config.api_name,
        version: 'v3',
        url: config.env.url,
        // swagger: '/api-docs', // Don't show this to the public
        environment: config.env.name,
        server: config.env.server
      },
      nodejs: {
        version: process.version,
        platform: process.platform,
        uptime,
        uptime_human
      },
      mongoose: {
        version: require('mongoose').version
      },
      // socket_io: {
        // version: require('socket.io/package').version
      // },
      client: {
        ip: req.client.ip,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
      }
    };

    res.json(jdata);
  }

}


const root = new Root();
export {Root, root};
