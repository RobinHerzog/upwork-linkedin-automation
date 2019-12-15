/**
 * Library for authentication
 */
import * as crypto from 'crypto';


class AuthLib {

  algorithm;
  encryption_key;
  algo: any;


  constructor() {
    this.algorithm = 'dxdedaw-ede3-cbc';
    this.encryption_key = 'Qwer231&wers';
    this.algo = 'base64'; // can be 'hex'
  }


  /**
   * Crypt string by synchronous Password-Based Key Derivation Function 2 (PBKDF2).
   * @param  {[type]} str - input string to be crypted
   * @return {[type]}     - encrypted string: "66ca2509023527f51651d20c898e2201e801ad0817"
   *
   * Possible alghoritms: sha1, sha256, sha512, md5
   * PBKDF2 is a one-way hashing algorithm. It's not possible to decrypt the generated hash.
   */
  strToSha256(str, salt, length) {
    if (str) {
      return crypto.pbkdf2Sync(str, salt, 1000, length, 'sha256').toString('hex');
    } else {
      return '';
    }
  }


}


const authLib = new AuthLib();
export {authLib, AuthLib};
