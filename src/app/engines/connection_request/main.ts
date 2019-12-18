import chalk from 'chalk';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

// libs
import logger from './libs/logger';
import config from './libs/config';

// functions
import browserTab from './functions/browserTab';
import cookie_takeFromInput from './functions/cookie_takeFrominput';
import openLoginPage from './functions/openLoginPage';
import cookie_saveToFile from './functions/cookie_saveToFile';
import profile_openPage from './functions/profile_openPage';




// function flow
import FunctionFlow from 'src/app/lib/functionflow/FunctionFlow';
const ff = new FunctionFlow();
const funcDefs = [
  browserTab,
  cookie_takeFromInput,
  openLoginPage,
  cookie_saveToFile,
  profile_openPage
];
ff.register(funcDefs);
ff.libInject({ff, puppeteer, cheerio, logger, config});



const main = async (cookies_arr: any, li_profile_id: string, message: string) => {

  // initialize input as data carrier
  const input = {
    cookies_arr, // AQEDARf4NAkFoFByAAABbxm5Kzs...
    li_profile_id, // emrick-coombs-bb0199183
    message, // Hi, I want make connection.
    page: '' // puppeteer page object
  };

  let x = await ff.serialRange(input, 0, 3, 2100, config.debugFF);
  x = await ff.serialRange(input, 4, 4, 800, config.debugFF);


  return x;
};


export default main;
