/**
 * Go to login page.
 */
export default async (x, libs) => {
  const logger = libs.logger;
  const ff = libs.ff;
  const page = x.page;
  const li_profile_id = x.li_profile_id;

  const profilePageURL = `https://www.linkedin.com/in/${li_profile_id}/`;

  // ff.delayRnd(1300, 3400);

  await page.goto(profilePageURL, {timeout: 30000});
  logger(`LI profile page opened ${profilePageURL}.`);

  return x;
};
