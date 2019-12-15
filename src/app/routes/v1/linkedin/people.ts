import * as moment from 'moment';
import { IRequest, IResponse, INext, IUser } from 'src/app/interfaces';
import { users_model } from 'src/app/models';
import * as jwt from 'jsonwebtoken';
import config from 'src/app/config';
import mailjetLib from 'src/app/lib/mailer/mailjetLib';
import { jwtLib } from 'src/app/lib/JwtLib';




class PeopleRoutes {


  /*
   * Register new customer and book for as conference.
   * POST /v1/customer/conference/:conference_id
{
  "cookie": {},
  "li_profile_id": "sara-madjer-79a709a2",
  "message": "Hello...",
}
   */
  async connection_request(req: IRequest, res: IResponse, next: INext) {
    const doc = req.body;

    try {


      res.json({test: 1});

    } catch (err) {
      return next(err);
    }

  }




}



const peopleRoutes = new PeopleRoutes();
export { peopleRoutes, PeopleRoutes };
