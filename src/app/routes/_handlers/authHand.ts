import { IRequest, IResponse, INext } from 'src/app/interfaces';
import config from 'src/app/config';

class AuthHand {

  /**
   * Checks API Key sent through HTTP Header
   * API-Key: '<token-string>'
   */
  checkApiKey(req: IRequest, res: IResponse, next: INext) {
    const api_key_header = req.header('API-Key');
    const api_key_config = config.api_key;
    console.log(api_key_header);

    if (api_key_header === api_key_config) {
      next();
    } else {
      next(new Error('Bad API Key.'));
    }
  }


}



export default new AuthHand();
