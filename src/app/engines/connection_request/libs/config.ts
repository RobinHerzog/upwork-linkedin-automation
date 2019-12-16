import * as os from 'os';


// define chrome executable path
const osPlatform = os.platform(); // Possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
console.log('\nScraper2a running on platform: ', osPlatform);
let executablePath;
if (/^win/i.test(osPlatform)) {
  executablePath = '';
} else if (/^linux/i.test(osPlatform)) {
  executablePath = '/usr/bin/google-chrome';
}


export default {
  viewport: {
    width: 1300,
    height: 1100
  },

  puppeteer: {
    executablePath,
    headless: false,
    devtools: false,  // Open Chrome devtools at the beginning of the test
    dumpio: false,
    slowMo: 25,  // Wait 250 ms each step of execution, for example chars typing
    args: ['--ash-host-window-bounds=1300x1100', '--window-size=1300,1100', '--window-position=700,20']
  },

  // linkedin
  page_home: 'https://www.linkedin.com',
  page_login: 'https://www.linkedin.com/login',

  // cookie
  cookie_file: process.env.COOKIE_FILE || `./tmp/cookies/user@linkedin_com.json`,

  debugFF: true // debug FunctionFlow
};
