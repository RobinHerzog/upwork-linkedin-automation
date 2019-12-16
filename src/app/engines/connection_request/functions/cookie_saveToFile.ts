import * as fse from 'fs-extra';

/**
 * Save chrome cookie to file after successful login.
 */
export default async (x: any, libs: any) => {
  const ff = libs.ff;
  const logger = libs.logger;
  const config = libs.config;
  const page = x.page;

  await fse.ensureFile(config.cookie_file);

  const cookies_arr = await page.cookies(); // fetch cookies from an opened web page
  await fse.writeJson(config.cookie_file, cookies_arr, {spaces: 2});

  logger(`Cookie saved to file ${config.cookie_file} .`);

  return x;
};
