import * as Mailjet from 'node-mailjet';
import { IMail, IUser } from 'src/app/interfaces';
import config from 'src/app/config';
import { loginlinkTmpl } from 'src/app/lib/mailer/templates';



export class MailjetLib {
  private mailjet: any;

  constructor() {
    this.mailjet = Mailjet.connect(config.env.mailer.mailjet.api_key, config.env.mailer.mailjet.api_secret);
  }

  private sendMail(message: IMail): Promise<any> {
    return this.mailjet
      .post('send', {url: 'api.mailjet.com', version: 'v3.1'})
      .request({
        Messages: [message]
      })
      .then((resp: any) => {
        console.log(resp);
      });
  }



  // send login link to educator after educator's registration (to confirm email)
  sendLoginLinkEmail(user: IUser, access_code: string, headers: object): Promise<any> {
    const loginlink = config.env.mailer.api_base + '/customer/conference/' + access_code;
    const Email = user.email;
    const Name = user.email.substring(0, user.email.indexOf('@'));

    const From = loginlinkTmpl.From;
    const To = [{Email, Name}];
    const Subject = loginlinkTmpl.Subject;
    const TextPart = loginlinkTmpl.TextPart
      .replace('#loginlink#', loginlink)
      .replace('#accesscode#', access_code)
      .replace('#user#', user.email);
    const HTMLPart = loginlinkTmpl.HTMLPart
      .replace(new RegExp('#loginlink#', 'g'), loginlink)
      .replace('#accesscode#', access_code)
      .replace('#user#', Name);

    const message: IMail = {From, To, Subject, TextPart, HTMLPart};
    // console.log(message);

    return this.sendMail(message);
  }


}


export default new  MailjetLib();
