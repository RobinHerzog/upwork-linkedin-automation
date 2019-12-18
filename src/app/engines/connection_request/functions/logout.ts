import * as fse from 'fs-extra';

/**
 * Logout from Linkedin.com.s
 */
export default async (x, libs) => {
  const ff = libs.ff;
  const logger = libs.logger;
  const config = libs.config;
  const page = x.page;


  // logout
  await page.click('#nav-settings__dropdown-trigger');
  await ff.delay(1300);
  await page.click('a[href="/m/logout/"]');

  // delete cookie file
  await fse.remove(config.cookie_file);


  logger('Logout finished. Cookie file deleted.');

  return x;
};
