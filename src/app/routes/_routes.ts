import { Router } from 'express';
import * as passport from 'passport';
import { IRequest, IResponse, INext } from 'src/app/interfaces';
import authHand from './_handlers/authHand';
const checkApiKey = authHand.checkApiKey.bind(authHand);

// routes
import { Root } from './root';
import { peopleRoutes } from './v1/linkedin/people';






class Routes {

  static activate() {
    return new this();
  }


  /* Passport auth middleware (users - admin, customer) */
  private authCheckUsers() {
    return passport.authenticate('jwt-users', {
      successRedirect: '',
      // failureRedirect: '/examples/auth/passport/badauth',
      failureRedirect: '',
      failWithError: true, // send error as JSON instead of 'unauthorized' string
      failureFlash: false,
      session: false // this must be false
    });
  }


  /**
   * Middleware which allow access for only specific user's role (admin or operator or cashier)
   * @param  roles        - ['admin', 'customer', 'seller']
   * @return Function     - middleware function
   */
  private mustHaveRoles(roles: string[]) {
    return (req: IRequest, res: IResponse, next: INext) => {
      const user_role = req.user.role;
      if (roles.indexOf(user_role) !== -1) {
        next();
      } else {
        next(new Error(`Role ${user_role} does not have permission for this endpoint.`));
      }
    };
  }


  // routes /...
  root(): Router {
    const router = Router();
    router.get('/', Root.apiData);
    return router;
  }


  // routes /v1/public/...
  linkedin(): Router {
    const router = Router();
    router.post('/connection-request', checkApiKey, peopleRoutes.connection_request);
    return router;
  }




}



export default Routes;
