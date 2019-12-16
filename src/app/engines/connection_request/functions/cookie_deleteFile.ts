import * as fse from 'fs-extra';

/**
 * Get cookie from JSON file and put it into chrome browser.
 */
module.exports = async (x, libs) => {
  const ff = libs.ff;
  const logger = libs.logger;
  const config = libs.config;
  const page = x.page;

  if (fse.existsSync(config.cookie_file)) {
    await fse.remove(config.cookie_file);
    logger('Cookie JSON file is deleted.');
  } else {
    logger('Cookie JSON file does not exist and so it is not deleted.');
  }

  return x;
};
