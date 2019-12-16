/**
 * Open browser and browser's tab.
 */
import * as devices from 'puppeteer/DeviceDescriptors';

const devicesExpanded = [
  {
    name: 'Desktop 1920x1080',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  {
    name: 'Desktop 1024x768',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1024,
      height: 768
    }
  },
  {
    name: 'Laptop 1280x800',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1280,
      height: 800
    }
  },
  devices.iPad,
  devices['iPad landscape']
];
const device = devicesExpanded[0]; // select a device


export default async (x, libs) => {
  const config = libs.config;
  const logger = libs.logger;


  const browser = await libs.puppeteer.launch(config.puppeteer);
  const page = await browser.newPage();
  page.emulate(device);
  await page.bringToFront();
  await page.setViewport({width: config.viewport.width, height: config.viewport.height});
  x.page = page;

  logger('Tab opened.');

  return x;
};
