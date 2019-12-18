/**
 * Go to login page.
 */
export default async (x, libs) => {
  const logger = libs.logger;
  const config = libs.config;
  const ff = libs.ff;
  const page = x.page;
  const message = x.message;

  logger('LI profile sending request...');

  const btn_sel = 'button.pv-s-profile-actions--connect';

  const btn_sel_exists = await page.waitForSelector(btn_sel, {timeout: 2100}).catch(err => console.log(err));
  if (!btn_sel_exists) {
    logger(' +++Connection request already sent to this LI profile.');
    ff.jump(6, 'function', config.debugFF);
    return x;
  }


  // open connection request dialog by clicking "Connect" button
  await page.click(btn_sel);

  ff.delayRnd(2100, 3400);

  // open message box by clicking on "Add a note"
  await page.click('button[aria-label="Add a note"]');

  // fill message box
  await ff.delayRnd(1400, 2100);
  await page.click('textarea[name="message"]');
  await page.keyboard.type(message);

  ff.delayRnd(2100, 3400);

  // send connection request
  await page.click('button[aria-label="Send invitation"]');

  logger('LI profile request is sent.');

  return x;
};
