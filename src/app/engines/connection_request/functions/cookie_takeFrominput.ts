/**
 * Get "li_at" cookie from the input.
 */
export default async (x: any, libs: any) => {
  const logger = libs.logger;
  const page = x.page;
  const cookies_arr = x.cookies_arr;

  for (const cookie of cookies_arr) {
    await page.setCookie(cookie);
  }

  logger('Cookie "li_at" loaded in the browser.');

  return x;
};
