import chalk from 'chalk';
import main1 from 'src/app/engines/connection_request/main';
import { IRequest, IResponse, INext, IUser } from 'src/app/interfaces';





class PeopleRoutes {


  /*
   * Register new customer and book for as conference.
   * POST /v1/likedin/connection-request
{
  "cookie_li_at": "AQEDARf4NAkDuHhHAAABbw9DB_gAAAFvM0-L-...",
  "li_profile_id": "emrick-coombs-bb0199183",
  "message": "Hello, I want to make connection with you.",
}
   */
  async connection_request(req: IRequest, res: IResponse, next: INext) {
    const bdy = req.body;
    const li_profile_id: string = bdy.li_profile_id;
    const message: string = bdy.message;
    const cookie_li_at: string = bdy.cookie_li_at;

    // prechecks
    if (!cookie_li_at) {
      return next(new Error('Cookie is required.'));
    } else if (!li_profile_id) {
      return next(new Error('LI profile ID is required.'));
    }

    // add li_at cookie to array (which is accepted by puppeteer)
    const cookies_arr = [{
      name: 'li_at',
      value: cookie_li_at,
      domain: '.www.linkedin.com',
      path: '/',
      expires: 1603188413.007051,
      size: 157,
      httpOnly: true,
      secure: true,
      session: false
    }];

    // send JSON response
    res.json({success: true, msg: `Linkedin request sent to ${li_profile_id}.`, cookies_arr});

    // run engine in the background
    main1(cookies_arr, li_profile_id, message)
      .then(resp => {
        // console.log('RES:: ', res);
        setTimeout(() => {
          console.log(chalk.green('Engine exited.'));
        }, 3000);
      })
      .catch(err => {
        console.error(chalk.red('ERR:: ', err));
        console.log(err);
        setTimeout(() => {
          console.log(chalk.green('Engine exited after error.'));
        }, 3000);
      });

  }




}



const peopleRoutes = new PeopleRoutes();
export { peopleRoutes, PeopleRoutes };
