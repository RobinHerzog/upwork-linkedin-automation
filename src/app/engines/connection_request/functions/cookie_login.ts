import * as fse from 'fs-extra';

/**
 * Login with cookie.
 * Load "li_at" cookie from the input or
 * load all cookies from /tmp/cookies/user@linkedin_com.json
 */
export default async (x: any, libs: any) => {
  const logger = libs.logger;
  const config = libs.config;
  const page = x.page;


  if (fse.existsSync(config.cookie_file)) {
    const cookies_arr_file = await fse.readJson(config.cookie_file);

    if (cookies_arr_file.length !== 0) {

      for (const cookie of cookies_arr_file) {
        await page.setCookie(cookie);
      }

      logger(`Cookies loaded in the browser from file ${config.cookie_file} .`);
    }

  } else {
    const cookies_arr_input = x.cookies_arr;

    for (const cookie of cookies_arr_input) {
      await page.setCookie(cookie);
    }

    logger('Cookie "li_at" loaded in the browser from the input.');
  }





  return x;
};
