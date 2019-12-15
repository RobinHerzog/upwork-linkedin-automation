/**
 * Library for JWT manipulation
 */

import * as moment from 'moment';



class JwtLib {

  /**
   * Set 'exp' (expiration) parameter for Json Web Token
   * @param role - 'admin', 'customer'
   */
  setExpiration(role: 'admin' | 'customer'): {exp: number, access_code_expire: Date} {
    let hours: number;
    switch (role) {
      case 'admin': hours = 6; break;
      case 'customer': hours = 730; break; // 730hours = 1month
      default: hours = 24; break;
    }
    const exp: number = Math.floor(Date.now() / 1000) + (60 * 60 * hours);
    const access_code_expire: Date = moment().add(hours, 'hours').toDate();
    return {exp, access_code_expire};
  }




}

const jwtLib = new JwtLib();
export { jwtLib };
