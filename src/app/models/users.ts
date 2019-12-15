// bluebird promisification
import * as mongoose from 'mongoose';
import * as BPromise from 'bluebird';
import * as jsonpatch from 'fast-json-patch';
import { authLib } from 'src/app/lib/AuthLib';

const mongooseP = BPromise.promisifyAll(mongoose);
mongooseP.Promise = BPromise; // Prevent error: "mpromise (mongoose's default promise library) is deprecated"

// define models
import SchemaUsers from './schema/Users';
const usersModel = mongooseP.model('usersMD', SchemaUsers);



/*** Common methods ***/
import CommonMethods from './commonMethods';




/*** Specific methods ***/
class Users extends CommonMethods {

  constructor() {
    super(usersModel);
  }

  // register new user
  register(doc) {
    if (!!doc && !!doc.password) {
      doc.password = authLib.strToSha256(doc.password, 'malozasoli', 21);
    }
    return super.add(doc); // from CommonMethods class
  }


  // check credentials username:password and login
  login(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Username or password are not defined.');
    }

    return usersModel
      .findOne({ username })
      .then((userDoc: any) => {
        // console.log(userDoc);
        let err;
        if (!userDoc) {
          err = new Error('Username does not exist.');
          err.level = 'info';
          throw err;
        }
        if (!userDoc.is_email_verified) {
          err = new Error('Email is not verified.');
          err.level = 'info';
          throw err;
        }

        const passCrypted = authLib.strToSha256(password, 'malozasoli', 21);
        // console.log(passDecoded, password);
        if (passCrypted !== userDoc.password) {
          err = new Error('Password is not correct.');
          err.level = 'info';
          throw err;
        }

        // can't login if user is not activated (approved)
        if (!userDoc.is_active) {
          err = new Error('Your account is not active.');
          err.level = 'info';
          throw err;
        }

        return userDoc;
      });
  }



  // patch (modify) 'password'
  patchPassword(username, pass_old, pass_new) {

    return module.exports.login(username, pass_old) // first check if old password is correct
      .then(doc => {

        const patchArr: [any] = [{
          op: 'replace',
          path: '/password',
          value: pass_new
        }];

        // apply patch to doc object
        jsonpatch.applyPatch(doc, patchArr, true);
        const docNew = doc;

        // create new mongoose doc with assigned save() methods
        doc.set(docNew);

        return doc.saveAsync();
      });

  }


}

const users_model = new Users();
export { users_model };
