/**
 * Go to login page.
 */
export default async (x, libs) => {
  const logger = libs.logger;
  const config = libs.config;
  const page = x.page;
  const ff = libs.ff;

  ff.delay(3400);

  logger(`Opening home page ${config.page_home} ...`);
  await page.goto(config.page_home, {timeout: 30000});
  logger(`  +current page: ${page.url()}`);


  return x;
};
